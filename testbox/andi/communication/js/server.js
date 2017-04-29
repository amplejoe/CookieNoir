let config = require("../config.json");
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
let activeClients = new Array();
let clientCount = 1;

// WebSocket server
wsServer.on('request', function(request) {
  console.log((new Date()) + ': WebSocket request');

  var connection = request.accept(null, request.origin);
  allConnections.push(connection);
  activeClients.push(0);

  // Message from client
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      // process WebSocket message

      var cMsgStr = message.utf8Data;
      var cMsg = JSON.parse(cMsgStr);

      console.log((new Date()) + ": received " + cMsgStr);

      if (cMsg.type == "init") {
        var response = {
          type: 'init',
          clientId: clientCount
        };
        connection.sendUTF(JSON.stringify(response));

        if (cMsg.active == true) {
          activeClients[allConnections.indexOf(connection)] = clientCount;
        } else {
          spectators.push(connection);
          activeClients[allConnections.indexOf(connection)] = 0;
          allConnections[allConnections.indexOf(connection)] = null;
        }

        clientCount++;
      } else if (cMsg.type == "topvideosreset") {
        initVideoViewCount();
        initHeatmap(cMsg.mapName, cMsg.level);
        setTimeout(resetSuggestions, 0, null);
      } else if (cMsg.type == "removetopvideo") {
        if (videoViewCount[cMsg.videoId] != undefined) {
          videoViewCount[cMsg.videoId] = 0;
        }
      } else if (cMsg.type == "positionHeartbeat") {
        handleMapPosition(cMsg);
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
    console.log((new Date()) + ": received close at " + allConnections.indexOf(connection));
    closeConnection(allConnections.indexOf(connection));
  });
});
