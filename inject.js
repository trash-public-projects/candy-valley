setTimeout(() => {
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
    waitForElm("iframe").then((elm) => {
        setTimeout(() => {
            window.location.replace("https://raw.githubusercontent.com/trigger-off/valley/main/Release.user.js");
        },10000)
    })
},5000)

