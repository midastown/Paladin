
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
    async function getData(url=`http://localhost:5000?url=${hostname.href}`) {
        const data = await fetch(url, {
            method: 'GET'
        });
        return data.json();
    }


    getData().then(data => { 
        if (data.isError == false) {
            let valid = data.valid
            let fake = data.fake;
            head.textContent = "Yes this articles has votes";
            vote.textContent = `Num of votes: ${valid} / ${fake}.`;
        } else {
            head.textContent = "Sorry no one has voted for this article yet, please come back later.";
            vote.textContent = "Num of votes: 0";
        }
    })
}
