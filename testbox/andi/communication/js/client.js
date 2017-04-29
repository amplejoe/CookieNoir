function sendCollaborationInfo(cMsg) {
    //collaboration: send infos to server
    if (webSock != null && webSock.readyState == 1) {
        webSock.send(JSON.stringify(cMsg));
        //console.log(cMsg);
    }
}

function collaborationMessage(evt) {
    var cMsg = JSON.parse(evt.data);

    if (cMsg.type == "init") {
        //console.log("received for init: " + evt.data);
        myClientId = cMsg.clientId;
        console.log("collaboration ID: " + myClientId);

    }
    else if (cMsg.type == "position") {
        console.log("Received new position: " + evt.data);
    }
    else {
        console.log("Received message: " + evt.data);
    }
}
