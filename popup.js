chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, showInfo);

let head = document.getElementById("text");
let perc = document.getElementById("percentage");
let vote = document.getElementById("votes");
let isArticle = false;



function showInfo(tab) {
    let hostname = new URL(tab[0].url);

    if (websites.has(hostname.hostname)) {
        chrome.tabs.sendMessage(tab[0].id, {txt: "getInfo"}, function(message) {
            console.log("before: " + isArticle);
            isArticle = message.isArticle;
            if (isArticle) {
                showData(hostname);
                return;
            }
            console.log("after: " + isArticle);
        });
       head.textContent = "Yes this website is indexed, go check out an article to see if we have data on it.";
    } else {
        head.textContent = "Sorry this website has not been indexed yet.";
    }
    
}

function showData(hostname) {
    // Sends a message to content.js 
    // who will send GET request to "server"/app.py
    // and app.py will check the mysql db:
    // if article is present
    // show percentage of valids vs fake
    // else
    head.textContent = "Sorry no one has voted for this article yet, please come back later.";
    vote.textContent = "Num of votes: 0";
}
