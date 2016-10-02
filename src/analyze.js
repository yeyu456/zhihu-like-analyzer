import Config from './config.js';
import Modal from './component/modal.js';

class Statistics {

    constructor() {
        this.expertData = [];
        this.expertNum = 0;
        this.seniorNum = 0;
        this.middleNum = 0;
        this.juniorNum = 0;
        this.zeroNum = 0;
    }

    get expert() {
        return this.expertNum;
    }

    get senior() {
        return this.seniorNum;
    }

    get middle() {
        return this.middleNum;
    }

    get junior() {
        return this.juniorNum;
    }

    get zero() {
        return this.zeroNum;
    }

    get expertList() {
        return this.expertData;
    }

    add(data, like, thank, ask, answer) {
        if (like <= Config.VOTE_DATA_FILTER_THRESHOLD &&
            thank <= Config.VOTE_DATA_FILTER_THRESHOLD &&
            ask <= Config.VOTE_DATA_FILTER_THRESHOLD &&
            answer <= Config.VOTE_DATA_FILTER_THRESHOLD) {
            this.zeroNum++;

        } else if (like < Config.VOTE_DATA_STATISTICS_JUNIOR_LIKE_THRESHOLD) {
            this.juniorNum++;

        } else if (like < Config.VOTE_DATA_STATISTICS_MIDDLE_LIKE_THRESHOLD) {
            this.middleNum++;

        } else if (like < Config.VOTE_DATA_STATISTICS_SENIOR_LIKE_THRESHOLD) {
            this.seniorNum++;

        } else if (like < Config.VOTE_DATA_STATISTICS_EXPERT_LIKE_THRESHOLD) {
            this.expertNum++;
            this.expertData.push({
                data: data,
                like: like,
                thank: thank,
                ask: ask,
                answer: answer
            });
        }
    }
}

export default class Analyze {

    static setAnalyzeData(dataArray) {
        let stat = new Statistics();
        dataArray.forEach(data => {
            let dataDom = Analyze._getDataDom(data);
            let status = dataDom.querySelector(Config.VOTE_STATUS_SELECTOR);
            let like = Analyze._getNumber(Config.VOTE_STATUS_LIKE_SELECTOR, ' 赞同', status);
            let thank = Analyze._getNumber(Config.VOTE_STATUS_THANK_SELECTOR, ' 感谢', status);
            let ask = Analyze._getNumber(Config.VOTE_STATUS_ASK_SELECTOR, ' 提问', status);
            let answer = Analyze._getNumber(Config.VOTE_STATUS_ANSWER_SELECTOR, ' 回答', status);
            stat.add(data, like, thank, ask, answer);
        });
        Modal.setModal(stat);
    }

    static _getDataDom(data) {
        let dom = document.createElement('div');
        dom.innerHTML = data;
        return dom.firstChild;
    }

    static _getNumber(selector, replacement, status) {
        let numberElem = status.querySelector(selector);
        if (!numberElem) {
            console.error('cannot find number elem ' + status.innerHTML + ' with selector ' + selector);
            return 0;
        }
        let text = numberElem.innerText;
        if (text) {
            text = text.replace(replacement, '').trim();
            //替换千单位
            text = text.replace('K', '000');
            if (text !== '' && /^\d+$/.test(text)) {
                return Number.parseInt(text);
            }
        }
        console.error('error number text:' + status.querySelector(selector).innerHTML);
        return 0;
    }
}