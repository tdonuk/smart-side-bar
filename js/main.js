const GOOGLE_ORIGIN = 'https://www.google.com';

// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
    .setPanelBehavior({openPanelOnActionClick: true})
    .catch((error) => console.error(error));


function selectTab(tabHolder, tabId) {
    console.info("selecting " + tabId + " of " + tabHolder)
    const holder = document.getElementById(tabHolder);

    const tabs = holder.getElementsByClassName("tab");

    for (let tab of tabs) {
        if (tab.id === tabId) {
            tab.style.display = "block";
        } else tab.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("loading..");
    initFrameListeners();
});

function initFrameListeners() {
    const buttonConfigs = [
        {
            button: document.getElementById("googleTabTrigger"),
            frame: document.getElementById("searchFrame")
        },
        {
            button: document.getElementById("youtubeTabTrigger"),
            frame: document.getElementById("youtubeFrame")
        },
        {
            button: document.getElementById("ytMusicTabTrigger"),
            frame: document.getElementById("ytMusicFrame")
        },
        {
            button: document.getElementById("whatsappTabTrigger"),
            frame: document.getElementById("whatsappFrame")
        },
        {
            button: document.getElementById("chatGptTabTrigger"),
            frame: document.getElementById("chatGptFrame")
        },
        {
            button: document.getElementById("telegramTabTrigger"),
            frame: document.getElementById("telegramFrame")
        },
    ];

    for (let buttonConfig of buttonConfigs) {
        buttonConfig.button.onclick = () => {
            const selectedFrame = getSelectedTab();
            console.log("selected frame: " + selectedFrame||selectedFrame.id);
            if(selectedFrame && buttonConfig.frame.id === selectedFrame.id) {
                console.log("reloading " + buttonConfig.frame.id);
                selectedFrame.contentWindow.location.reload();
                return;
            }

            selectTab("frameHolder", buttonConfig.frame.id);

            buttonConfig.button.classList.add("selected");
            buttonConfig.frame.classList.add("selected-frame");

            buttonConfigs.forEach(b => {
                b.button.classList.remove("selected");
                b.frame.classList.remove("selected-frame");
            });
        }
    }

    buttonConfigs[0].button.onclick(null);
}

function getSelectedTab() {
    const tabs = document.getElementById("frameHolder").getElementsByClassName("selected-frame");
    console.log(JSON.stringify(tabs))
    return tabs.item(0);
}