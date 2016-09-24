
/*eslint no-console: ["error", { allow: ["log", "error"] }] */
import Config from './config.js';

function listen() {
    chrome.webRequest.onCompleted.addListener(() => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {'new': true}, () => {
                console.log('received');
            });
        });
    }, { urls: [Config.ANSWER_REQUEST_URL] }, ['responseHeaders']);
}

listen();