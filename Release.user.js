// ==UserScript==
// @name         FreeValley
// @namespace    http://tampermonkey.net/
// @version      1
// @description  hack valley 
// @author       Triggeroff
// @match        *://*/*
// @grant        none
// @require      https://github.com/trigger-off/valley/raw/main/Hack.js
// ==/UserScript==

(function() {
    'use strict';
    if (window.location.host === "localhost"){
        setTimeout(function() {
        var needUrl = document.querySelector("iframe").src;
        window.location.replace(needUrl);
        },3500)
        
    } else {
        waitForElm('#bottomMenu > div > div.button.settings > div').then((elm) => {
            console.log('Script is ready');
            executeScript();
        });

    }
})();
