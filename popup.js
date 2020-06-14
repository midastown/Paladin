chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, getCurrentURL);

let head = document.getElementById("text");
let perc = document.getElementById("percentage");
let vote = document.getElementById("votes");

function getCurrentURL(tab) {
    let hostname = new URL(tab[0].url);
    // object = parseURL(hostname);
    // this function will disassemble the url and will try
    // to figure out if it's an article or not.
    //
    // if (!object.isArticle) {
    //     showValidity(hostname.hostname);
    // } else {
    //     showData(hostname);
    // }
    showValidity(hostname.hostname);
}


function showValidity(host) {
    console.log(host);
    if (websites.has(host)){
        head.textContent = "Yes this website is indexed, go check out an article to see if we have data on it.";
    } else {
        head.textContent = "Sorry this website has not been indexed yet.";
    }
}


function parseURL(host) {
    let parsedURL = {
        isArticle: false
    };
    strURL = host.href;

    if (strURL.indexOf("article") != -1) {
        parseURL.isArticle = true;
    } else if (strURL.indexOf("wcm") != -1) {
        parseURL.isArticle = true;
    } else if (strURL.indexOf(...........)) {
        parseURL.isArticle = true;
    }
   
}
