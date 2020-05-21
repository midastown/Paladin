chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, getCurrentURL);

let head = document.getElementById("text");

function getCurrentURL(tab) {
    let hostname = new URL(tab[0].url);
    showValidity(hostname.hostname);
}


function showValidity(host) {
    console.log(host);
    if (websites.has(host)){
        head.textContent = "Congrats";
    } else {
        head.textContent = "Nop";
    }
}

