import Config from './config.js';
import Dom from './dom.js';
import Network from './network.js';
import Analyze from './analyze.js';

async function analyzeFunc(url, targetDom) {
    let nextUrl = url;
    let data = [];
    while(nextUrl) {
        let voteData = await Network.ajax(nextUrl);
        if (voteData && voteData['success']) {
            if (voteData['paging']) {
                nextUrl = voteData['paging']['next'];
                
            } else {
                nextUrl = null;
            }
            let payload = voteData['payload'];
            if (payload && payload instanceof Array && payload.length !== 0) {
                data = data.concat(payload);
            }
        } else {
            break;
        }
    }
    Analyze.setAnalyzeData(data, targetDom);
}

export default class Inject {

    static setAnalyzer(targetDom) {
        let voteBar = targetDom.querySelector(Config.VOTE_BAR_SELECTOR);
        if (!voteBar) {
            return;
        }
        let voteUrl = Inject._getVoteUrl(targetDom);
        if (!voteUrl) {
            return;
        }
        let injectBtn = Dom.getAnalyzeButton(voteUrl, analyzeFunc);
        voteBar.appendChild(injectBtn);
        voteBar.classList.add('core-injected-bar');
    }

    static _getVoteUrl(targetDom) {
        let answerIdDom = targetDom.querySelector(Config.ANSWER_ID_SELECTOR);
        if (!answerIdDom) {
            return null;
        }
        let answerId = answerIdDom.getAttribute('content');
        if (!answerId) {
            return null;
        }
        return Config.ANSWER_VOTE_URL_PREFIX + answerId + Config.ANSWER_VOTE_URL_SUFFIX;
    }
}