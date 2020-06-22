chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, showInfo);

let head = document.getElementById("text");
let perc = document.getElementById("percentage");
let vote = document.getElementById("votes");
let isArticle = false;
// chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    let msg = {
        txt: "getInfo"
    }
    chrome.tabs.sendMessage(tab[0].id, msg, function(message) {
        console.log(message);
    });
}


function showInfo(tab) {
    let hostname = new URL(tab[0].url);

    if (websites.has(hostname.hostname)) {
        parseURL(hostname);
        if (! isArticle) {
            checkContent(tab);
        }
        if (isArticle) {
            showData(hostname);
        } else {
            head.textContent = "Yes this website is indexed, go check out an article to see if we have data on it.";
        }
    } else {
        head.textContent = "Sorry this website has not been indexed yet.";
    }
    
}

function checkContent(tab) {

    chrome.tabs.sendMessage(tab[0].id, {txt: "getInfo"}, function(message) {
        isArticle = message.isArticle;
    });
}




function parseURL(host) {
    
    strURL = host.href;
    let re = /(19|20)\d\d[-/]\d\d[-/]\d\d/;

    if (strURL.indexOf("article") != -1) {
        isArticle = true;
    } else if (strURL.indexOf("wcm") != -1) {
        isArticle = true;
    } else if (re.test(strURL)) {
        isArticle = true;
    }
}

function showData(hostname) {
    // looks into database
    // if article is present
    // show percentage of valids vs fake
    // else
    head.textContent = "Sorry no one has voted for this article yet, please come back later.";
    vote.textContent = "Num of votes: 0";
}
