let config = require("./config.json");
//let $ = require('jquery');
let ip = config.serverAddress;
let port = config.serverPort;
console.log((new Date()) + ": " + ip + ":" + port);

let WebSocketServer = require('websocket').server;
let http = require('http');
let server = http.createServer(function(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('Hello Cookie\n');
});
server.listen(port, ip);
console.log((new Date()) + ': Server running at ' + ip + ':' + port + '/');

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});


let allConnections = new Array();
let playerIdx = -1;

function closeConnection(idx) {

    let cMsg = {type:'logoff', clientId:idx};
    let cMsgStr = JSON.stringify(cMsg);
    console.log((new Date()) + ': WebSocket closed connection to client ' + cMsg.clientId);

    allConnections.splice(idx, 1);

    if (idx == playerIdx) playerIdx = -1;

    //send logout info to all
    // let i;
    // for (i=0; i < allConnections.length; i++) {
    //     if (allConnections[i] != null && observers[i] != 0) {
    //         allConnections[i].sendUTF(cMsgStr);
    //     }
    // }
}

// WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ': WebSocket request');

  let connection = request.accept(null, request.origin);
  let dictEntry = {id: allConnections.length, type:"", connection: null};
  //allConnections.push(connection);
  // observers.push(0);

  // Message from client
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message

      let cMsgStr = message.utf8Data;
      let cMsg = JSON.parse(cMsgStr);

      console.log((new Date()) + ": received " + cMsgStr);

      if (cMsg.type == "init") {

        let doAddConnection = true;
        if (cMsg.active == true) {
          if (playerIdx < 0)
          {
            dictEntry.type = "player";
            dictEntry.connection = connection;
            playerIdx = dictEntry.id;
          }
          else
          {
            doAddConnection = false;
            console.log((new Date()) + ": A player already exists - tearing down connection.");
          }
          //observers[allConnections.indexOf(connection)] = allConnections.length;
        } else {
          dictEntry.type = "observer";
        }

        if (doAddConnection)
        {
          dictEntry.connection = connection;
          allConnections.push(dictEntry);
          let response = {
            type: 'init',
            clientId: dictEntry.id
          };
          connection.sendUTF(JSON.stringify(response));

        }
        else
        {
          let response = {
            type: 'playerexists',
            playerID: playerIdx
          };
          connection.sendUTF(JSON.stringify(response));
          connection.close(); // dont allow more than one players
        }

      } else {
        console.log((new Date()) + ": Forwarding message from " + connection.remoteAddress + ": " + cMsgStr);
        if (cMsg.type == "position" ||
          cMsg.type == "suggest") {
          forward(cMsgStr);
        }
        forwardSpectators(cMsgStr)
        if (cMsg.type == "position") {
          setTimeout(handleMapPosition, 0, cMsg);
          //handleMapPosition(cMsg);
        }
      }
    }
  });

  connection.on('close', function(c2) {
    // close user connection

    for (let i=0;i<allConnections.length;i++)
    {
      if (allConnections[i].connection == connection)
        {
          console.log((new Date()) + ": received close at " + i);
          closeConnection(i);
        }
    }
  });
});
