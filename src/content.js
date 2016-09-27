/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import Config from './config.js';
import Inject from './inject.js';

function injectCSS() {
    //inject css link
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL(Config.CSS_PATH);
    (document.head || document.documentElement).appendChild(style);
}

function listenMsg() {
    chrome.runtime.onMessage.addListener(request => {
        if (request['new']) {
            injectElement();
        }
    });
}

function injectElement() {
    let curUrl = window.location.href;
    let items;
    switch (curUrl) {
        case Config.INDEX_URL:
            items = document.querySelectorAll(Config.INDEX_FEED_ITEM_SELECTOR);
            break;

        case Config.TOPIC_URL:
        case Config.EXPLORE_URL:
            items = document.querySelectorAll(Config.NORMAL_FEED_ITEM_SELECTOR);
            break;

        default:
            return;
    }
    if (items && items.length !== 0) {
        for (let i = 0; i < items.length; i++) {
            Inject.setAnalyzer(items[i]);
        }
    }
}

function init() {
    injectCSS();
    injectElement();
    listenMsg();
}

init();