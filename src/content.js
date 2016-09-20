
import Config from './config.js';

function injectCSS() {
    //inject css link
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL(Config.CSS_PATH);
    (document.head||document.documentElement).appendChild(style);
}

function init() {
    document.addEventListener('DOMContentLoaded', () => {
        injectCSS();
    });
}

init();