// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
    .setPanelBehavior({openPanelOnActionClick: true})
    .catch((error) => console.error(error));


function selectTab(tabId) {
    const holder = document.getElementById("frameHolder");

    const tabs = holder.getElementsByClassName("tab");

    for (let tab of tabs) {
        tab.classList.remove("selected-frame");
    }

    document.getElementById(tabId).classList.add("selected-frame");
}

function selectTabButton(buttonId) {
    const holder = document.getElementById("header");

    const buttons = holder.getElementsByClassName("item-box");

    for(let button of buttons) {
        button.classList.remove("selected");
    }

    document.getElementById(buttonId).classList.add("selected");
}

document.addEventListener("DOMContentLoaded", function () {
    initFrameListeners();

    const refreshButton = document.getElementById("refreshButton");
    refreshButton.onclick = () => {
        const frameHolder = document.getElementById("frameHolder");
        const selectedTab = frameHolder.getElementsByClassName("selected-frame")[0];

        frameHolder.removeChild(selectedTab);

        frameHolder.insertAdjacentElement("afterbegin", selectedTab);
    }
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
            button: document.getElementById("instagramTabTrigger"),
            frame: document.getElementById("instagramFrame")
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
            selectTab(buttonConfig.frame.id);
            selectTabButton(buttonConfig.button.id);
        }
    }

    selectTab(buttonConfigs[0].frame.id);
    selectTabButton(buttonConfigs[0].button.id);
}