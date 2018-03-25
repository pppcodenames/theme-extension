chrome.storage.local.get(["isEnabled", "themeString"], function(result){
    isEnabled = result['isEnabled'] || false;
    themeString = result['themeString'] || false;
    chrome.webRequest.onBeforeRequest.addListener(
        function (details){
            if (!isEnabled) { return ; }
            let myUrl = details.url;
            /*if (myUrl.indexOf("/rotations/") > -1) {
                let numRotations = Switcher.getRotations(result.themeString);
                let randRotation = Math.floor(Math.random() * numRotations) + 1;
                return {redirectUrl: `http://images.neopets.com/themes/${themeString}/rotations/${randRotation}.png`};
            }*/
            let regexp = /\/themes\/([0-9a-z_]+)/;
            let thisTheme = myUrl.match(regexp)[1];
            return {redirectUrl: myUrl.replace(regexp, `/themes/${themeString||thisTheme}`)};
        },
        {urls: [//"http://images.neopets.com/themes/*/events/*",
                //"http://images.neopets.com/themes/*/navigation/*",
                //"http://images.neopets.com/themes/*/rotations/*",
                "http://images.neopets.com/css/themes/*"]},
        ["blocking"]
    );
});