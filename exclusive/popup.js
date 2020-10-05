
// tags in the popup.html
let head = document.getElementById("text");
let buttons = document.getElementById("buttons");
let output = document.getElementById("output-message");

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
                renderCastHTML(hostname);
                return;
        }});
        
        head.textContent = "Yes this website is indexed, click on an article, do your research and then cast your vote.";
    } else {
        head.textContent = "Sorry this website has not been indexed yet.";
    }
    
}

function renderCastHTML(hostname){
    // render HTML
    // create buttons who launch CastVote() function on-click
    castVote(hostname, valid, fake);
}



function castVote(hostname, valid, fake) {
    // Hard-coded values to test server
    async function postData(url=`http://localhost:5000?url=${hostname.href}&valid=${valid}&fake=${fake}`) {
        const data = await fetch(url, {
            method: 'POST', 
            cache: 'no-cache',
        });
        return data.json();
    }


    postData().then(data => {
        if (data.isError == false) {
            console.log(data);
            head.textContent = `Here's what the current vote show: ${valid} / %{fake}`;
            output.textContent = `${data.message}. Vote casted!`;

        } else {
            head.textContent = "Sorry no one has voted for this article yet, please come back later.";
            vote.textContent = "Num of votes: 0";
        }
    })
}
