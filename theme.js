(function () {
    chrome.storage.local.get(["isEnabled", "themeString"], function(result){
        let newTheme = result.themeString;
        let isEnabled = result.isEnabled;

        let linkElem = $('link[href*="/themes/"]');
        if (linkElem.length === 0) {
            //console.debug("qutting: no theme sheet found here");
            return;
        }

        let getThemeFromUrl = function(url) {
            let regexp = /\/themes\/([0-9a-z_]+)/;
            return url.match(regexp)[1];
        }

        let href = linkElem.attr('href');
        let originalTheme = getThemeFromUrl(href);
        //console.debug(`original: ${originalTheme}`);

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                //console.debug(request);
                if(request.action != "settingUpdate") {return;}

                let alreadyDisabled = isEnabled === false;

                isEnabled = request.isEnabled === null ? isEnabled : request.isEnabled;
                let theme;

                if(isEnabled && request.themeString) {
                    theme = request.themeString;
                } else if (isEnabled && newTheme) {
                    theme = newTheme;
                } else if (!request.isEnabled && !alreadyDisabled && originalTheme) {
                    theme = originalTheme;
                } else {
                    //console.debug('not repainting');
                    return;
                }
                changeStylesheet(theme);
                updateImages(theme);
            }
        );

        let changeStylesheet = function(setTheme){
            let href = linkElem.attr('href');
            let oldTheme = getThemeFromUrl(href);
            if (oldTheme == setTheme) {
                return;
            }
            //console.debug(`original: ${originalTheme}`);
            linkElem.attr('href' , href.replace(oldTheme, setTheme));
        };

        let updateImages = function(setTheme) {
            //let update = true;
            let selector = "";
            selector += '.nav_image img[src*="/themes/"]';
            selector += ', .copyright img[src*="/themes/"]';
            selector += ', .eventIcon.sf img[src*="/themes/"]';
            $(selector).each(function(i,e){
                let src = e.src;
                let oldTheme = getThemeFromUrl(src);
                //console.debug(oldTheme, setTheme);
                /*if (oldTheme == setTheme) {
                    update = false;
                    return false;
                }*/
                e.src = src.replace(oldTheme, setTheme);
            });

            /*if (!update) {
                return;
            }*/

            let numRotations = Switcher.getRotations(setTheme);
            let randRotation = Math.floor(Math.random() * numRotations) + 1;
            let rotImg = `http://images.neopets.com/themes/${setTheme}/rotations/${randRotation}.png`;
            $('.footerNifty').attr('src', rotImg);
        };

        if (!(result.isEnabled && result.themeString)) {
            //console.debug('quit');
            return;
        } else {
            changeStylesheet(newTheme);
        }

        /////////////////////////////////////////
        // create an observer instance
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {

                if( mutation.type == "childList"
                    && mutation.addedNodes.length > 0
                    && mutation.addedNodes[0].nodeName == "IMG"
                    && mutation.addedNodes[0].src.indexOf('/themes/') > -1)
                {
                    if (mutation.addedNodes[0].src.indexOf('/rotations/') > -1) {
                        if (mutation.addedNodes[0].className != 'footerNifty'){
                            return;
                        }
                        let numRotations = Switcher.getRotations(newTheme);
                        let randRotation = Math.floor(Math.random() * numRotations) + 1;
                        mutation.addedNodes[0].src = `http://images.neopets.com/themes/${newTheme}/rotations/${randRotation}.png`;
                        //observer.disconnect();
                    }
                    else {
                        if (mutation.target.parentElement.className != 'nav_image'
                            && mutation.target.parentElement.className != 'nav_image nav_premium_header'
                            && mutation.target.parentElement.className != 'copyright'
                            && mutation.target.className != 'copyright'
                            && mutation.target.parentElement.className != 'eventIcon sf'){
                            return;
                        }
                        let src = mutation.addedNodes[0].src;
                        let oldTheme = getThemeFromUrl(src);
                        mutation.addedNodes[0].src = src.replace(oldTheme, newTheme);
                    }
                }
            });
        });

        // configuration of the observer:
        let config = { attributes: false, childList: true, characterData: false , subtree: true };

        // pass in the target node, as well as the observer options
        observer.observe(document, config);

        document.addEventListener("DOMContentLoaded", function(event) {
            observer.disconnect();
        });
    });
})();