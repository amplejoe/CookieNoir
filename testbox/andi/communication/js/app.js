window.onload = function()
{
    // game variable
    // Tutorial.phasergame = new Phaser.Game(Tutorial.SCREEN_WIDTH, Tutorial.SCREEN_HEIGHT);

    // add states
    // Tutorial.phasergame.state.add('Game', Tutorial.Game);

    // start Title state
    // Tutorial.phasergame.state.start('Boot');

    let webSock = new WebSocket("ws://"+Client.SERVER_ADDRESS+":"+Client.SERVER_PORT);
    webSock.onopen = function() {
        console.log("WebSocket connected");
        var cMsg = {type:'init', active:true};
        webSock.send(JSON.stringify(cMsg));
    };
    webSock.onclose = function() { console.log("WebSocket closed"); };
    webSock.onerror = function(evt) { console.log("webSocket error " + evt.data); };
    webSock.onmessage = collaborationMessage;
};
