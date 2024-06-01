// ==UserScript==
// @name         Disable Health Reduction
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Скрипт для удаления функции уменьшения здоровья в игре
// @author       triggeroff
// @match        *://*
// @grant        none
// ==/UserScript==
'use strict';

(function () {
    function executeScript() {
        
        document.querySelector("#bottomMenu > div > div.button.settings > div").style['background-image'] = "url(https://raw.githubusercontent.com/trigger-off/valley/main/settings.png)";
        window.User.prototype.removeLifeOnStartGame = function() {
            var e = {
                actionName: "start game",
                actionEpisode: episode.getNumForStatistics(),
                actionLevel: application.level.num,
                actionPrice: 0
            };
            return 1 === episode.get("num") && 1 === application.level.num && firstSessionLogger.logEvent("start 1st game"),
            user.get("firstTime") || 1 !== episode.get("num") || 0 !== episode.scores.length || 1 !== application.level.num || (e.actionName = "not first #1"),
            goods.checkProduct("unlimitedLifes") ? (this.set(e),
            !0) : (this.get("lives") == Config.maxLives ? (e.livesLastRestored = application.getCurrentServerTime(),
            e.lives = this.get("lives")) : e.lives = this.get("lives"),
            this.set(e, {
                validate: !0
            }))
        };
        window.NewLivesSystem.prototype.removeLifeOnStartGame = function() {
            var e = {
                actionName: "start game",
                actionEpisode: episode.getNumForStatistics(),
                actionLevel: application.level.num,
                actionPrice: 0
            };
            return 1 === episode.get("num") && 1 === application.level.num && firstSessionLogger.logEvent("start 1st game"),
            user.get("firstTime") || 1 !== episode.get("num") || 0 !== episode.scores.length || 1 !== application.level.num || (e.actionName = "not first #1"),
            goods.checkProduct("unlimitedBwLives") ? (user.set(e),
            !0) : (this.gameIsStarted = !0,
            user.get("bwnewlives") == Config.maxLives ? (e.bwNewLivesLastRestored = application.getCurrentServerTime(),
            e.bwnewlives = user.get("bwnewlives")) : e.bwnewlives = user.get("bwnewlives"),
            user.set(e, {
                validate: !0
            }))
        };
        window.EventLivesSystem.prototype.removeLifeOnStartGame = function() {
            if (this.isOnRestoreMode())
                return !1;
            var e = {
                actionName: "start game",
                actionEpisode: episode.getNumForStatistics(),
                actionLevel: application.level.num,
                actionPrice: 0
            };
            return user.set(e, {
                validate: !0
            }),
            this.gameIsStarted = !0
        };
        window.User.prototype.addAndRemoveLifeOnLoseGame = function() {
            var e = {
                actionName: "lose game",
                actionEpisode: episode.getNumForStatistics(),
                actionLevel: application.level.num,
                actionPrice: 0,
                lives: this.get("lives"),
                livesLastRestored: this.get("livesLastRestored"),
                withoutLoseSeria: 0
            };
            this.countLose(),
            this.countNealyWin(),
            goods.checkProduct("unlimitedLifes") ? this.set(e) : (e.lives < Config.maxLives && e.lives++,
            e.lives == Config.maxLives && (e.livesLastRestored = application.getCurrentServerTime()),

            this.set(e, {
                validate: !0
            }))
        };
        window.NewLivesSystem.prototype.addAndRemoveLifeOnLoseGame = function() {
            var e = {
                actionName: "lose game",
                actionEpisode: episode.getNumForStatistics(),
                actionLevel: application.level.num,
                actionPrice: 0,
                bwnewlives: user.get("bwnewlives"),
                bwNewLivesLastRestored: user.get("bwNewLivesLastRestored"),
                withoutLoseSeria: 0
            };
            this.countLose(),
            this.countNealyWin(),
            goods.checkProduct("unlimitedBwLives") ? user.set(e) : (e.bwnewlives < this.livesAmount && e.bwnewlives++,
            e.bwnewlives === this.livesAmount && (e.bwNewLivesLastRestored = application.getCurrentServerTime()),
            this.gameIsStarted = !1,
            user.set(e, {
                validate: !0
            }))
        };
        window.EventLivesSystem.prototype.addAndRemoveLifeOnLoseGame = function() {
            var e = {
                actionName: "lose game",
                actionEpisode: episode.getNumForStatistics(),
                actionLevel: application.level.num,
                actionPrice: 0,
                withoutLoseSeria: 0
            };
            user.set(e, {
                validate: !0
            }),
            this.gameIsStarted = !1,
            this.addLife(!0)
        }
    };
    if (window.top === window.self) {
        console.log("hi!");
    }
    else {
        setTimeout(function() {
            executeScript();
        }, 25000);
    }
})();
