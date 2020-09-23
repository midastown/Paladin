
// tags in the popup.html
let head = document.getElementById("text");
let perc = document.getElementById("percentage");
let vote = document.getElementById("votes");
let isArticle = false;

// Getting the current tab
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, showInfo);

function showInfo(tab) {
    hostname = new URL(tab[0].url);
    // checks if current website is in set
    if (websites.has(hostname.hostname)) {
        // runs search function in content.js
        chrome.tabs.sendMessage(tab[0].id, {txt: "getInfo"}, function(message) {
            isArticle = message.isArticle;
            if (isArticle) {
                showData(hostname);
                return;
        }});
        
        head.textContent = "Yes this website is indexed, go check out an article to see if we have data on it.";
    } else {
        head.textContent = "Sorry this website has not been indexed yet.";
    }
    
}

function showData(hostname) {
    const xhr = new XMLHttpRequest();
    
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status <= 300) {
            const response = JSON.parse(xhr.responseText);
            let valids = response.valid;
            let fake = response.fake;
            head.textContent = "Yes this articles has votes";
            vote.textContent = `Num of votes: ${valids} / ${fake}.`;
        } else {
            head.textContent = "Sorry no one has voted for this article yet, please come back later.";
            vote.textContent = "Num of votes: 0";
       }
    };

    const json = {
        "url": hostname.href,
    };
    
    xhr.open('POST', 'http://localhost:5000/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));
}
