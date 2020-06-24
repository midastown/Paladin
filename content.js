


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

let msg = parseHTML();


chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
    if (message.txt == "getInfo") {
        sendResponse(msg);
    } else {
        sendResponse({txt: "something's wrong"});
    }
    return true;
}


// console.log(parseHTML(metas));
