chrome.windows.getCurrent(function(window) {
    chrome.tabs.query({
        'active': true,
        'windowId': chrome.windows.WINDOW_ID_CURRENT
    },
        function(tabs) {
            let urli = new URL(tabs[0].url);
        }
    );
});



let text_area = document.getElementById("greet");


var websites = new Set(
    "nationalpost.com",
    "www.theglobeandmail.com",
    "calgaryherald.com",
    "calgarysun.com",
    "edmontonjournal.com",
    "edmontonsun.com",
    "www.dailyheraldtribune.com",
    "lethbridgeherald.com",
    "medicinehatnews.com",
    "www.reddeeradvocate.com",
    "www.alaskahighwaynews.ca",
    "www.kelownadailycourier.ca",
    "www.winnipegfreepress.com",
    "www.brandonsun.com",
    "www.timescolonist.com",
    "vancouversun.com",
    "theprovince.com",
    "www.trailtimes.ca",
    "www.pentictonherald.ca",
    "winnipegsun.com",
    "www.acadienouvelle.com",
    "tj.news",
    "www.thetelegram.com",
    "www.thechronicleherald.ca",
    "www.saltwire.com",
    "www.capebretonpost.com",
    "www.brantfordexpositor.ca",
    "www.recorder.ca",
    "www.standard-freeholder.com",
    "www.thespec.com",
    "www.kenoradailyminerandnews.com",
    "www.thewhig.com",
    "www.therecord.com",
    "lfpress.com",
    "www.niagarafallsreview.ca",
    "www.nugget.ca",
    "www.ledroit.com",
    "ottawacitizen.com",
    "ottawasun.com",
    "www.owensoundsuntimes.com",
    "www.thepeterboroughexaminer.com",
    "www.theobserver.ca",
    "www.saultstar.com",
    "www.simcoereformer.ca",
    "www.stcatharinesstandard.ca",
    "www.stthomastimesjournal.com",
    "www.stratfordbeaconherald.com",
    "www.thesudburystar.com",
    "www.chroniclejournal.com",
    "www.timminspress.com",
    "torontosun.com",
    "www.thestar.com",
    "www.wellandtribune.ca",
    "windsorstar.com",
    "www.woodstocksentinelreview.com",
    "www.theguardian.pe.ca",
    "www.journalpioneer.com",
    "www.lavoixdelest.ca",
    "www.whitehorsestar.com",
    "thestarphoenix.com",
    "leaderpost.com",
    "paherald.sk.ca",
    "www.lapresse.ca",
    "www.sherbrookerecord.com",
    "www.ledevoir.com",
    "www.journaldemontreal.com",
    "journalmetro.com",
    "montrealgazette.com",
    "www.journaldequebec.com",
    "www.lesoleil.com",
    "www.latribune.ca",
);

function showValidity(host, text) {
    if (websites.has(host)){
        text.textContent = "This website is valid";
    } else {
        text.textContent = "Sorry this website has not been supported yet";
    }
}


showValidity(urli.hostname, text_area);
