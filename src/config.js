
const Config = {

    INJECT_CSS_CLASS: 'core-inject',

    CSS_PATH: 'css/inject.css',

    ANSWER_REQUEST_URL: 'https://www.zhihu.com/node/TopStory2FeedList',
    
    //点赞栏
    VOTE_BAR_SELECTOR: '.zm-votebar:not(.core-injected-bar)',

    //普通答案参数
    ANSWER_VOTE_URL_PREFIX: 'https://www.zhihu.com/answer/',

    ANSWER_VOTE_URL_SUFFIX: '/voters_profile',

    ANSWER_ID_SELECTOR: 'meta[itemprop="answer-id"]',


    //专栏参数
    ZHUAN_LAN_VOTE_URL_PREFIX: 'https://www.zhihu.com/post/',

    ZHUAN_LAN_VOTE_URL_SUFFIX: '/voters_profile',

    ZHUAN_LAN_ID_SELECTOR: 'meta[itemprop="post-id"]',


    //分析目标class
    INDEX_FEED_ITEM_CLASS: 'feed-content zm-item-expanded',

    TOPIC_FEED_ITEM_CLASS: 'feed-item zm-item-expanded'

};
export default Config;