


function parseHTML() {
    let msg = {isArticle: false};
    let head = document.getElementsByTagName("head");
    let metas = head[0].getElementsByTagName("meta");

    for (meta of metas) {
        if (meta.getAttribute("content") == "article") {
            msg.isArticle = true;
            return msg;
        }
    }
    return msg;
}



chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    if (message.txt == "getInfo") {
        let msg = parseHTML();
        sendResponse(msg);
    } else {
        sendResponse({txt: "something's wrong"});
    }
}


