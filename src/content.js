
/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import Config from './config.js';
import Dom from './dom.js';

function injectCSS() {
    //inject css link
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL(Config.CSS_PATH);
    (document.head||document.documentElement).appendChild(style);
}

function listenMsg() {
    chrome.runtime.onMessage.addListener(request => {
        if (request['new']) {
            injectElement();
        }
    });
}

function injectElement() {
    let voteBars = document.querySelectorAll(Config.VOTE_BAR_SELECTOR);
    for (let i=0;i<voteBars.length;i++) {
        let injectBtn = Dom.getAnalyzeButton();
        voteBars[i].appendChild(injectBtn);
        voteBars[i].classList.add('core-injected-bar');
    }
}

function init() {
    injectCSS();
    injectElement();
    listenMsg();
}

init();