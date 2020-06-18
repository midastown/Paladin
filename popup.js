chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, getCurrentURL);

let head = document.getElementById("text");
let perc = document.getElementById("percentage");
let vote = document.getElementById("votes");

function getCurrentURL(tab) {
    let hostname = new URL(tab[0].url);
    let parsed = parseURL(hostname);
    // this function will disassemble the url and will try
    // to figure out if it's an article or not.
    //
    if (parsed.isArticle) {
        showData(hostname);
    } else {
        showValidity(hostname.hostname);
    }
}


function showValidity(host) {
    console.log(host);
    if (websites.has(host)) {
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
    let re = /(19|20)\d\d[-/]\d\d[-/]\d\d/;

    if (strURL.indexOf("article") != -1) {
        parsedURL.isArticle = true;
    } else if (strURL.indexOf("wcm") != -1) {
        parsedURL.isArticle = true;
    } else if (re.test(strURL)) {
        parsedURL.isArticle = true;
    }
    console.log(parsedURL);
    return parsedURL;   
}

function showData(hostname) {
    // looks into database
    // if article is present
    // show percentage of valids vs fake
    // else
    head.textContent = "Sorry no one has voted for this article yet, please come back later.";
    vote.textContent = "Num of votes: 0";
}
