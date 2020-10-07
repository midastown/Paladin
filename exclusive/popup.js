
// tags in the popup.html
let head = document.getElementById("text");
let buttons = document.getElementById("buttons");
let output = document.getElementById("output-message");
let valid_button = document.getElementById("valid");
let fake_button = document.getElementById("fake");

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
    // shows buttons and wait for a vote
    head.textContent = "To the best of my ability, I sincerely cast my vote:"
    buttons.removeAttribute("hidden");
    valid_button.addEventListener('click', event => {
        castVote(hostname, 1, 0);
    });
    fake_button.addEventListener('click', event => {
        castVote(hostname, 0, 1);
    });

}



function castVote(hostname, valid, fake) {
    // sends post request returns status response and 
    // vote result
    async function postData(url) {
        const data = await fetch(url, {
            method: 'POST', 
            cache: 'no-cache',
        });
        return data.json();
    }


    postData(`http://localhost:5000?url=${hostname.href}&valid=${valid}&fake=${fake}`).then(data => {
        if (data.isError == false) {
            console.log(data);
            head.textContent = `Here's what the current vote show: ${data.good} / ${data.bad}`;
            output.textContent = `${data.message}. Vote casted!`;

        } else {
            head.textContent = "Sorry no one has voted for this article yet, please come back later.";
            vote.textContent = "Num of votes: 0";
        }
    })
}
