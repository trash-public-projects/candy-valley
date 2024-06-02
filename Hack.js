var inf_moves = false;
var inf_hearts = true;
var inf_boosts = false;
var orig_move;
var orig_User_removeLifeOnStartGame;
var orig_NewLivesSystem_removeLifeOnStartGame;
var orig_EventLivesSystem_removeLifeOnStartGame;
var orig_User_addAndRemoveLifeOnLoseGame;
var orig_NewLivesSystem_addAndRemoveLifeOnLoseGame;
var orig_EventLivesSystem_addAndRemoveLifeOnLoseGame;
var orig_GameClass_move;
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
function infMoves(state) {
    if (state){
        window.GameClass.prototype.move = eval("(" + window.GameClass.prototype.move.toString().replace('this.get("moves") - 1', 'this.get("moves")') + ")");
        window.GameClass.prototype.move = eval("(" + window.GameClass.prototype.move.toString().replace('this.get("moves")-1', 'this.get("moves")') + ")");
    } else {
        window.GameClass.prototype.move = orig_GameClass_move;
    }


}
function infHearts(state) {
    if (state){
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
    } else {
        window.User.prototype.removeLifeOnStartGame = orig_User_removeLifeOnStartGame;
        window.NewLivesSystem.prototype.removeLifeOnStartGame = orig_NewLivesSystem_removeLifeOnStartGame;
        window.EventLivesSystem.prototype.removeLifeOnStartGame = orig_EventLivesSystem_removeLifeOnStartGame;
        window.User.prototype.addAndRemoveLifeOnLoseGame = orig_User_addAndRemoveLifeOnLoseGame;
        window.NewLivesSystem.prototype.addAndRemoveLifeOnLoseGame = orig_NewLivesSystem_addAndRemoveLifeOnLoseGame;
        window.EventLivesSystem.prototype.addAndRemoveLifeOnLoseGame = orig_EventLivesSystem_addAndRemoveLifeOnLoseGame;
    }
}
function infBoosts(state){
    if (state){
        window.User.prototype.usePowerUp = eval("(" + window.GameClass.prototype.move.toString().replace('e.get("amount") - 1', 'e.get("amount")') + ")");
        window.User.prototype.usePowerUp = eval("(" + window.GameClass.prototype.move.toString().replace('e.get("amount")-1', 'e.get("amount")') + ")");
    } else {
        window.User.prototype.usePowerUp = orig_User_usePowerUp;
    }
}
function win(){
    window.GameBaseView.prototype.onWin();
}
function executeScript() {
    try {
        orig_User_removeLifeOnStartGame = window.User.prototype.removeLifeOnStartGame;
        orig_NewLivesSystem_removeLifeOnStartGame = window.NewLivesSystem.prototype.removeLifeOnStartGame;
        orig_EventLivesSystem_removeLifeOnStartGame = window.EventLivesSystem.prototype.removeLifeOnStartGame;
        orig_User_addAndRemoveLifeOnLoseGame = window.User.prototype.addAndRemoveLifeOnLoseGame;
        orig_NewLivesSystem_addAndRemoveLifeOnLoseGame = window.NewLivesSystem.prototype.addAndRemoveLifeOnLoseGame;
        orig_EventLivesSystem_addAndRemoveLifeOnLoseGame = window.EventLivesSystem.prototype.addAndRemoveLifeOnLoseGame;
        orig_GameClass_move = window.GameClass.prototype.move;
        orig_User_usePowerUp = window.User.prototype.usePowerUp;
        waitForElm('.settingsInGame').then((elm) => {
            elm.style['background-image'] = "url(https://raw.githubusercontent.com/trigger-off/valley/main/pause.png)"
            waitForElm('#settingsWindow > div.main > div.musicBlock.menuItem > div.playerID.showUserIdBtn.smallBtn').then((elm) => {
                elm.addEventListener("touchend", function () {
                    if(confirm("Пропустить уровень?")) {
                        win();
                    }
                
                })
            });

        });
        var setting_button = document.querySelector("#bottomMenu > div > div.button.settings > div")
        setting_button.style['background-image'] = "url(https://raw.githubusercontent.com/trigger-off/valley/main/settings.png)";
        var heart_icon = document.querySelector(".lifesBlockIco");
        heart_icon.addEventListener("touchend", function () {
            inf_hearts = confirm("Бесконечные жизни?");
            inf_moves = confirm("Бесконечные шаги?");
            inf_boosts = confirm("Бесконечные бусты?");
            infMoves(inf_moves);
            infHearts(inf_hearts);
            infBoosts(inf_boosts);

        })
        infHearts(inf_hearts);
        infMoves(inf_moves);
        infBoosts(inf_boosts);
    } catch (e){
        console.error(e);
    }
}
