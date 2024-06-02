// ==UserScript==
// @name         FreeValley
// @namespace    http://tampermonkey.net/
// @version      1
// @description  hack valley 
// @author       Triggeroff
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @require      https://raw.githubusercontent.com/trigger-off/valley/main/Hack.js
// ==/UserScript==

(function() {
    'use strict';
    
    if (window.location.host === "localhost"){
        
        waitForElm("iframe").then((elm) => {
            setTimeout(() => {
                if (GM_getValue("uid") === undefined){
                    var needUrl = elm.src;
                    window.location.replace(needUrl);
                } else {
                    window.location.replace(updateURLParameter(elm.src,"deviceUid", GM_getValue("uid")));
                }
            },4000)
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
