var inf_moves = false;
var inf_hearts = true;
var inf_boosts = false;
var enable_skips = false;
var orig_move;
var orig_User_removeLifeOnStartGame;
var orig_NewLivesSystem_removeLifeOnStartGame;
var orig_EventLivesSystem_removeLifeOnStartGame;
var orig_User_addAndRemoveLifeOnLoseGame;
var orig_NewLivesSystem_addAndRemoveLifeOnLoseGame;
var orig_EventLivesSystem_addAndRemoveLifeOnLoseGame;
var orig_GameClass_move;
function waitForProperties() {
    const checkInterval = 100; // Интервал проверки в миллисекундах
  
    return new Promise((resolve) => {
      // Функция, которая проверяет наличие всех необходимых свойств
      function arePropertiesDefined() {
        return (
          window.User && window.User.prototype.removeLifeOnStartGame &&
          window.NewLivesSystem && window.NewLivesSystem.prototype.removeLifeOnStartGame &&
          window.EventLivesSystem && window.EventLivesSystem.prototype.removeLifeOnStartGame &&
          window.User.prototype.addAndRemoveLifeOnLoseGame &&
          window.NewLivesSystem.prototype.addAndRemoveLifeOnLoseGame &&
          window.EventLivesSystem.prototype.addAndRemoveLifeOnLoseGame &&
          window.GameClass && window.GameClass.prototype.move &&
          window.User.prototype.usePowerUp
        );
      }
  
      // Ожидание, пока все свойства не будут объявлены
      const intervalId = setInterval(() => {
        if (arePropertiesDefined()) {
          clearInterval(intervalId);
          resolve();
        }
      }, checkInterval);
    });
  }
function updateURLParameter(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (var i=0; i<tempArray.length; i++){
            if(tempArray[i].split('=')[0] != param){
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}
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
        waitForProperties().then(() => {
        // Все переменные объявлены, сохраняем оригинальные функции
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
            elm.addEventListener("touchend",function () {
                if(enable_skips) {
                    if(confirm("Пропустить уровень?")){
                        win();
                    } 
                }
            })

        });
        waitForElm("#userIdWindow > div.main > textarea").then((elm) => {
            elm.removeAttribute('readonly');
            var button_ok = document.querySelector("#userIdWindow > div.footerBig > div.oneAltBtn.close");
            button_ok.addEventListener("touchend", function() {
                GM_setValue("uid", elm.value);
                window.location.replace(updateURLParameter(window.location.href,"deviceUid", elm.value));
            })
        })
        waitForElm("#bottomMenu > div > div.button.settings > div").then((elm) => {
            setting_button.style['background-image'] = "url(https://raw.githubusercontent.com/trigger-off/valley/main/settings.png)"
        });
        waitForElm(".lifesBlockIco").then((elm) => {
            heart_icon.addEventListener("touchend", function () {
                inf_hearts = confirm("Бесконечные жизни?");
                inf_moves = confirm("Бесконечные шаги?");
                inf_boosts = confirm("Бесконечные бусты?");
                enable_skips = confirm("Включить пропуск уровней?");
                infMoves(inf_moves);
                infHearts(inf_hearts);
                infBoosts(inf_boosts);
    
            })
        })
        infHearts(inf_hearts);
        infMoves(inf_moves);
        infBoosts(inf_boosts);
    });
    } catch (e){
        console.error(e);
    }
}
