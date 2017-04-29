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
  sendCollaborationInfo: function(cMsg)
  {
    //collaboration: send infos to server
    if (this.webSock != null && this.webSock.readyState == 1) {
        this.webSock.send(JSON.stringify(cMsg));
        //console.log(cMsg);
    }
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
      else if (cMsg.type == "playerexists")
      {
          console.log("Connection refused: A player is already connected! (current player ID: "+cMsg.playerID+"))");
      }
      else
      {
          console.log("Received message: " + evt.data);
      }
  }
};
