import Modal from './component/modal.js';

class Statistics {

    static FILTER_THRESHOLD = 0;

    static JUNIOR_LIKE_THRESHOLD = 100;

    static MIDDLE_LIKE_THRESHOLD = 1000;

    static SENIOR_LIKE_THRESHOLD = 10000;

    static EXPERT_LIKE_THRESHOLD = Number.MAX_SAFE_INTEGER;

    constructor() {
        this.bestData = [];
        this.identityData = [];
        this.expertData = [];
        this.seniorData = [];
        this.expertNum = 0;
        this.seniorNum = 0;
        this.middleNum = 0;
        this.juniorNum = 0;
        this.zeroNum = 0;
        this.anonymousNum = 0;
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

    get anonymous() {
        return this.anonymousNum;
    }

    get bestList() {
        return this.bestData;
    }

    get identityList() {
        return this.identityData;
    }

    get expertList() {
        return this.expertData;
    }

    get seniorList() {
        return this.seniorData;
    }

    addAnonymous() {
        this.anonymousNum++;
    }

    addBest(data) {
        this.bestData.push({
            data: data
        });
    }

    addIdentity(data) {
        this.identityData.push({
            data: data
        });
    }

    add(data, like, thank, ask, answer) {
        if (like <= Statistics.FILTER_THRESHOLD &&
            thank <= Statistics.FILTER_THRESHOLD &&
            ask <= Statistics.FILTER_THRESHOLD &&
            answer <= Statistics.FILTER_THRESHOLD) {
            this.zeroNum++;

        } else if (like < Statistics.JUNIOR_LIKE_THRESHOLD) {
            this.juniorNum++;

        } else if (like < Statistics.MIDDLE_LIKE_THRESHOLD) {
            this.middleNum++;

        } else if (like < Statistics.SENIOR_LIKE_THRESHOLD) {
            this.seniorNum++;
            this.seniorData.push({
                data: data,
                like: like,
                thank: thank,
                ask: ask,
                answer: answer
            });

        } else if (like < Statistics.EXPERT_LIKE_THRESHOLD) {
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

    static VOTE_BODY_SELECTOR = '.body';

    static LIKE_SELECTOR = 'li:nth-child(1) span';

    static LIKE_REPLACEMENT = ' 赞同';

    static THANK_SELECTOR = 'li:nth-child(2) span';

    static THANK_REPLACEMENT = ' 感谢';

    static ASK_SELECTOR = 'li:nth-child(3) a';

    static ASK_REPLACEMENT = ' 提问';

    static ANSWER_SELECTOR = 'li:nth-child(4) a';

    static ANSWER_REPLACEMENT = ' 回答';

    static ANONYMOUS_BODY = '匿名用户';

    static BEST_SELECTOR = '.icon-badge-best_answerer';

    static IDENTITY_SELECTOR = '.icon-badge-identity';

    static setAnalyzeData(dataArray) {
        let stat = new Statistics();
        dataArray.forEach((data) => {
            let dataDom = Analyze._getDataDom(data);
            let body = dataDom.querySelector(Analyze.VOTE_BODY_SELECTOR);
            if (Analyze._isAnonymous(body)) {
                stat.addAnonymous();

            } else {
                let like = Analyze._getNumber(Analyze.LIKE_SELECTOR, Analyze.LIKE_REPLACEMENT, body);
                let thank = Analyze._getNumber(Analyze.THANK_SELECTOR, Analyze.THANK_REPLACEMENT, body);
                let ask = Analyze._getNumber(Analyze.ASK_SELECTOR, Analyze.ASK_REPLACEMENT, body);
                let answer = Analyze._getNumber(Analyze.ANSWER_SELECTOR, Analyze.ANSWER_REPLACEMENT, body);
                stat.add(data, like, thank, ask, answer);

                if (Analyze._isBest(body)) {
                    stat.addBest(data);
                }
                if (Analyze._isIdentity(body)) {
                    stat.addIdentity(data);
                }
            }
        });
        Modal.setModal(stat);
    }

    static _getDataDom(data) {
        let dom = document.createElement('div');
        dom.innerHTML = data;
        return dom.firstChild;
    }

    static _isAnonymous(body) {
        return body.innerHTML.trim() === Analyze.ANONYMOUS_BODY;
    }

    static _isBest(body) {
        return body.querySelector(Analyze.BEST_SELECTOR) !== null;
    }

    static _isIdentity(body) {
        return body.querySelector(Analyze.IDENTITY_SELECTOR) !== null;
    }

    static _getNumber(selector, replacement, body) {
        let numberElem = body.querySelector(selector);
        if (!numberElem) {
            console.error('cannot find number elem ' + body.innerHTML + ' with selector ' + selector);
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
        console.error('error number text:' + body.querySelector(selector).innerHTML);
        return 0;
    }
}