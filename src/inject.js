import Config from './config.js';
import Dom from './dom.js';

export default class Inject {

    static setAnalyzer(targetDom) {
        let voteBar = targetDom.querySelector(Config.VOTE_BAR_SELECTOR);
        if (voteBar) {
            let voteUrl = Inject._getVoteUrl(targetDom);
            let injectBtn = Dom.getAnalyzeButton();
            voteBar.appendChild(injectBtn);
            voteBar.classList.add('core-injected-bar');
        }
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
    }
}