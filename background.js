let isEnabled = null;
let themeString = null;

let setIcons = function (on) {
    chrome.browserAction.setIcon(on?
        {path: {"32": "theme-icon32.png"}}
       :{path: {"32": "theme-icon32-off.png"}});
};

chrome.storage.local.get(['isEnabled', 'themeString'], function(result){
    isEnabled = result.isEnabled;
    themeString = result.themeString;

    setIcons(isEnabled);
});

chrome.storage.onChanged.addListener(function(changes){
    // TODO: Figure out better way to handle this (isEnabled)
    //       True should persist but False should revert to null/undefined
    isEnabled = changes.isEnabled ? changes.isEnabled.newValue : isEnabled;
    themeString = changes.themeString ? changes.themeString.newValue : themeString;
    chrome.tabs.query({url: ['http://*.neopets.com/*', "http://www.jellyneo.net/dailies/"]}, function(tabs){
        for (let tab of tabs) {
            chrome.tabs.sendMessage(tab.id,
                {action: "settingUpdate",
                isEnabled: isEnabled,
                themeString: themeString});
        }
    });
    setIcons(isEnabled);
});