CookieNoir.Client = function(address, port, type)
{
  this.serverIP = address;
  this.serverPort = port;
  this.clientType = type;
  this.webSock;

  this.infoTextStyle = { font: '40pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(255,255,255,1.0)', strokeThickness: 4};

  // TODO: pass reference of state into constructor
  // -> for now global CookieNoir.phasergame is used for client outputs
  //this.currentState = state;
};

CookieNoir.Client.prototype =
{
  constructor: CookieNoir.Client,
  connect: function()
  {
    this.webSock = new WebSocket("ws://"+this.serverIP+":"+this.serverPort);
    this.webSock.onopen = () => {
        console.log("WebSocket connected");
        let isActive = (this.clientType == CookieNoir.CLIENT_TYPE.PLAYER) ? true:false;
        let cMsg = {type:'init', active:isActive};
        this.webSock.send(JSON.stringify(cMsg));
    };
    this.webSock.onclose = function() { console.log("WebSocket closed"); };
    this.webSock.onerror = function(evt) { console.log("webSocket error " + evt.data); };
    this.webSock.onmessage = (evt) => {this.receiveMessage(evt)};
  },
  sendMessage: function(cMsg)
  {
    // send infos to server
    if (this.webSock != null && this.webSock.readyState == 1) {
        this.webSock.send(JSON.stringify(cMsg));
        //console.log(cMsg);
    }
  },
  requestGameInfo: function()
  {
    this.sendMessage("gaminfo");
  },
  printPhaserMessage: function(text,duration)
  {
    let phaserState = CookieNoir.phasergame.state.getCurrentState();
    let infoText = phaserState.add.text(phaserState.world.centerX, phaserState.world.centerY, text, this.infoTextStyle);
    infoText.anchor.setTo(0.5);
    // create new movement tween {properties}, duration, easing function, autostart, delay, repeat_number, yoyo (play back and forth)
    let tween = phaserState.add.tween(infoText).to({alpha: 0.0}, duration, Phaser.Easing.Linear.None, true, 0);
    tween.onComplete.add(
      () =>
      {infoText.destroy();},this);
  },
  receiveMessage: function(evt)
  {
      let cMsg = JSON.parse(evt.data);

      if (cMsg.type == "init") {
          //console.log("received for init: " + evt.data);
          myClientId = cMsg.clientId;
          let type = "Unknown";
          console.log(cMsg.clientType + " ID: " + myClientId);

      }
      else if (cMsg.type == "initgame")
      {
        let msg = "Game starting in " + cMsg.remaining;
        console.log(msg);
        //CookieNoir.phasergame.state.getCurrentState().game.debug.text("Client: " + msg, 5, 64);
        this.printPhaserMessage(msg, 1400);
      }
      else if (cMsg.type == "gamestart")
      {
        console.log("Game started!");
      }
      else if (cMsg.type == "playerexists")
      {
          console.log("Connection refused: A player is already connected! (current player ID: "+cMsg.playerID+"))");
      }
      else if (cMsg.type == "gamestopped")
      {
        console.log("Game ended after, total Duration: " + cMsg.time);
        this.printPhaserMessage("Game Over!\nPlay Time: "+ cMsg.time, 5000);
      }
      else if (cMsg.type == "gameinfo")
      {
        console.log("Game Info: ");
        let observerString = "";
        for (let i=0;i<cMsg.observerIds.length;i++)
        {
          observerString += cMsg.observerIds[i] + " ";
        }
        console.log("Player ID " + cMsg.playerID + ", Observer IDs " +
          observerString + ", Game Time " + cMsg.gameTime +"/" + cMsg.totalTime);
      }
      else
      {
          console.log("Received message: " + evt.data);
      }
  }
};
