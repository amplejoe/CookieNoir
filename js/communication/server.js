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

// servervars
let allConnections = new Array();
let playerIdx = -1;
// game timing
let gameInitStartTime = -1;
let gameInitInterval;
let gameStartTime = -1;

// utils
function toInt(value) { return ~~value; }
function getFormattedTime(ms_time)
{
    var seconds = Math.round(ms_time / 1000.0);

    var hours = toInt(seconds / (60 * 60));
    if (hours > 0)
    {
        seconds -= hours * 60 * 60;
    }
    var minutes =  toInt(seconds / 60);
    if (minutes > 0)
    {
        seconds -= minutes * 60;
    }

    // add 0s for non double digit values
    var retTime = (hours > 9? "" : "0") + hours + ":" +
        (minutes > 9? "" : "0") + minutes + ":" +
        (seconds > 9? "" : "0") + seconds;

    return retTime;
}

function sendMessage(data, toConnection)
{
  toConnection.sendUTF(JSON.stringify(data));
}

function broadcast(message)
{
  for (i=0; i < allConnections.length; i++)
  {
    // console.log(allConnections[i].connection);
    sendMessage(message, allConnections[i].connection);
  }
}

function closeConnection(idx) {

    let cMsg = {type:'logoff', clientId:idx};
    let cMsgStr = JSON.stringify(cMsg);
    console.log((new Date()) + ': WebSocket closed connection to client ' + cMsg.clientId);

    allConnections.splice(idx, 1);

    if (idx == playerIdx)
    {
      playerIdx = -1;
    }

    //send logout info to all
    // let i;
    // for (i=0; i < allConnections.length; i++) {
    //     if (allConnections[i] != null && observers[i] != 0) {
    //         allConnections[i].sendUTF(cMsgStr);
    //     }
    // }
}

function closeAllConnections()
{
  for (i=0; i < allConnections.length; i++)
  {
    allConnections[i].connection.close();
  }
}

function initGame()
{
  gameInitStartTime = Math.floor(Date.now());
  console.log((new Date()) + ': Starting game in ' + getFormattedTime(config.game_start_timeout_ms));
  gameInitInterval = setInterval(function()
  {
    let elapsed = (Math.floor(Date.now()) - gameInitStartTime);
    if (elapsed >= config.game_start_timeout_ms) {
      clearInterval(gameInitInterval);
      startGame();
    } else broadcast({type:"initgame", remaining: getFormattedTime(config.game_start_timeout_ms - elapsed)})
  }, 1000);
}

function startGame()
{
  console.log((new Date()) + ': Game started');
  broadcast({type:"gamestart"});
  gameStartTime = Math.floor(Date.now());
  setTimeout(stopGame, config.game_duration_ms);
}

function stopGame()
{
  let endTime = getFormattedTime(config.game_duration_ms);
  console.log((new Date()) + ': Game ended after ' + endTime );
  broadcast({type:"gamestopped", time: endTime });
  // reset intervals
  gameStartTime = -1;
  gameInitStartTime = -1;
  // tear down connections
  closeAllConnections();
}

// WebSocket server
wsServer.on('request', function(request)
{
  console.log((new Date()) + ': WebSocket request');

  let connection = request.accept(null, request.origin);
  let dictEntry = {
    id: allConnections.length,
    type: "",
    connection: null
  };
  //allConnections.push(connection);
  // observers.push(0);

  // Message from client
  connection.on('message', function(message)
  {
    if (message.type === 'utf8')
    {
      // process WebSocket message

      let cMsgStr = message.utf8Data;
      let cMsg = JSON.parse(cMsgStr);

      console.log((new Date()) + ": received " + cMsgStr);

      if (cMsg.type == "init")
      {

        let doAddConnection = true;
        if (cMsg.active == true)
        {
          if (playerIdx < 0)
          {
            dictEntry.type = "player";
            dictEntry.connection = connection;
            playerIdx = dictEntry.id;
          }
          else doAddConnection = false;
        }
        else   dictEntry.type = "observer";


        if (doAddConnection)
        {
          dictEntry.connection = connection;
          allConnections.push(dictEntry);
          sendMessage({type: 'init', clientId: dictEntry.id, clientType: dictEntry.type}, connection);
          let num_participants =  allConnections.length;
          if (num_participants < 2) console.log((new Date()) + ': Waiting for second participant.');
          else initGame();
        }
        else
        {
          sendMessage({type: 'playerexists', playerID: playerIdx}, connection);
          console.log((new Date()) + ": player already exists - tearing down connection.");
          connection.close(); // dont allow more than one players
        }

      }
      else if (cMsg.type == "gaminfo")
      {
        let observerIds = [];
        for (let i=0;i<allConnections.length;i++)
        {
          let currentId = allConnections[i].id;
          if (currentId != playerIdx) observerIds.push(currentId);
        }
        let gameTime = ms(Math.floor(Date.now()) - gameStartTime);
        sendMessage({type:'gameinfo', playerID: playerIdx, observerIds: observerIds,
                gameTime: gameTime, totalTime: msToTime(config.game_duration_ms) });
      }
      else
      {
        console.log((new Date()) + ": Forwarding message from " + connection.remoteAddress + ": " + cMsgStr);
        if (cMsg.type == "position" ||
          cMsg.type == "suggest")
        {
          forward(cMsgStr);
        }
        forwardSpectators(cMsgStr)
        if (cMsg.type == "position")
        {
          setTimeout(handleMapPosition, 0, cMsg);
          //handleMapPosition(cMsg);
        }
      }
    }
  });

  connection.on('close', function(c2)
  {
    // close user connection
    for (let i = 0; i < allConnections.length; i++)
    {
      if (allConnections[i].connection == connection)
      {
        console.log((new Date()) + ": received close at " + i);
        closeConnection(i);
      }
    }
  });
});
