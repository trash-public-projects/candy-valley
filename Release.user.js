// ==UserScript==
// @name         FreeValley
// @namespace    http://tampermonkey.net/
// @version      1
// @description  hack valley 
// @author       Triggeroff
// @match        *://*/*
// @grant        GM_addStyle
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @require      https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @require      https://raw.githubusercontent.com/trigger-off/valley/main/Hack.js
// @require      https://raw.githubusercontent.com/trigger-off/tampermenu/master/menu.js
// @run-at       document-end
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
            var external$uiCss = "ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/dark-hive/jquery-ui.css";
            $("head").append(
                '<link href="//'
                +  external$uiCss
                + '" rel="stylesheet" type="text/css">'
            );

            var menuHandler = createMenu({
                textName: "Inject",
                items: [{
                    menuText: "DO IT!",
                    iconClass: "ui-icon-heart",
                    onClick: function(){
                    alert("hi");
                    executeScript();
                    }
                }]
            });
            
        });

    }
})();
