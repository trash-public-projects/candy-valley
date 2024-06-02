// ==UserScript==
// @name         FreeValley
// @namespace    http://tampermonkey.net/
// @version      1
// @description  hack valley 
// @author       Triggeroff
// @match        *://*/*
// @require     https://gist.githubusercontent.com/arantius/3123124/raw/grant-none-shim.js
// @require      https://raw.githubusercontent.com/trigger-off/valley/main/Hack.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.dir(window);

    if (window.location.host === "localhost"){
        
        waitForElm("iframe").then((elm) => {
            setTimeout(() => {
                if (GM_getValue("uid") === undefined){
                    var needUrl = elm.src;
                    window.location.replace(needUrl);
                } else {
                    window.location.replace(updateURLParameter(elm.src,"deviceUid", GM_getValue("uid")));
                }
            },5000)
        })
    } else {
        waitForElm('#bottomMenu > div > div.button.settings > div').then((elm) => {
            console.log('Script is ready');
            
            executeScript();
            
            
        });
        waitForElm("#prePreloadPage > div > span").then((elm) => {
            elm.textContent = "Загружаю скрипт";
            document.querySelector("#prePreloadPage > div").style.color = "#ff2bebff"
        })

    }
})();
