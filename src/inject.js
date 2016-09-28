import Config from './config.js';
import Dom from './dom.js';
import Network from './network.js';

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
        let func = Inject._getAnalyzeFunc(voteUrl);
        let injectBtn = Dom.getAnalyzeButton(func);
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

    static _getAnalyzeFunc(url) {
        return async function () {
            let nextUrl = url;
            while(nextUrl) {
                let voteData = await Network.ajax(nextUrl);
                if (voteData && voteData['success']) {
                    if (voteData['paging'] && voteData['paging']['next']) {
                        nextUrl = voteData['paging']['next'];
                        console.log(nextUrl);
                        continue;
                    }
                }
                nextUrl = null;
            }
        };
    }
}