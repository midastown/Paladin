
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
            console.log("before: " + isArticle);
            isArticle = message.isArticle;
            // checks if the current page is an article
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
    const xhr = new XMLHttpRequest();
    
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status <= 300) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
        }
    };

    const json = {
        "url": hostname.href,
    };
    
    xhr.open('POST', 'http://localhost:5000/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(json));


    head.textContent = "Sorry no one has voted for this article yet, please come back later.";
    vote.textContent = "Num of votes: 0";
}
