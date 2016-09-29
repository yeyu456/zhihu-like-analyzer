import Config from './config.js';

export default class Analyze {

    static setAnalyzeData(dataArray, targetDom) {
        dataArray.forEach((data) => {
            let dataDom = Analyze._getDataDom(data);
            
            let status = dataDom.querySelector(Config.VOTE_STATUS_SELECTOR);
            let like = status.find(Config.VOTE_STATUS_LIKE_SELECTOR);
            let thank = status.find(Config.VOTE_STATUS_THANK_SELECTOR);
            let ask = status.find(Config.VOTE_STATUS_ASK_SELECTOR);
            let answer = status.find(Config.VOTE_STATUS_ANSWER_SELECTOR);
        });
    }

    static _getDataDom(data) {
        let dom = document.createElement('div');
        dom.innerHTML = data;
        return dom.firstChild;
    }
}