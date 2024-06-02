// ==UserScript==
// @name         FreeValley
// @namespace    http://tampermonkey.net/
// @version      1
// @description  hack valley 
// @author       Triggeroff
// @match        *://*/*
// @grant        none
// @require      https://raw.githubusercontent.com/trigger-off/valley/main/Hack.js
// ==/UserScript==

(function() {
    'use strict';
    
    if (window.location.host === "localhost"){
        waitForElm("iframe").then((elm) => {
            var needUrl = elm.src;
            window.location.replace(needUrl);
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
