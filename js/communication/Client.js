CookieNoir.Client = function(address, port, type)
{
  this.serverIP = address;
  this.serverPort = port;
  this.clientType = type;
  this.webSock;
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
    this.webSock.onmessage = this.collaborationMessage;
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
  collaborationMessage: function(evt)
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
        console.log("Game starting in " + cMsg.remaining);
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
