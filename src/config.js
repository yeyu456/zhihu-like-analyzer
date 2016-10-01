
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

    //点赞数据
    VOTE_STATUS_SELECTOR: '.body',

    VOTE_STATUS_LIKE_SELECTOR: 'li:nth-child(1) span',

    VOTE_STATUS_THANK_SELECTOR: 'li:nth-child(2) span',

    VOTE_STATUS_ASK_SELECTOR: 'li:nth-child(3) a',

    VOTE_STATUS_ANSWER_SELECTOR: 'li:nth-child(4) a',

    VOTE_STATUS_AUTHOR: '.author',


    //点赞数据统计阈值
    VOTE_DATA_FILTER_THRESHOLD: 0,

    VOTE_DATA_STATISTICS_JUNIOR_LIKE_THRESHOLD: 100,

    VOTE_DATA_STATISTICS_MIDDLE_LIKE_THRESHOLD: 1000,

    VOTE_DATA_STATISTICS_SENIOR_LIKE_THRESHOLD: 10000,

    VOTE_DATA_STATISTICS_EXPERT_LIKE_THRESHOLD: Number.MAX_SAFE_INTEGER,


    //专栏参数
    ZHUAN_LAN_VOTE_URL_PREFIX: 'https://www.zhihu.com/post/',

    ZHUAN_LAN_VOTE_URL_SUFFIX: '/voters_profile',

    ZHUAN_LAN_ID_SELECTOR: 'meta[itemprop="post-id"]',


    //首页分析目标
    INDEX_FEED_ITEM_SELECTOR: '.feed-content',

    //首页URL
    INDEX_URL: 'https://www.zhihu.com/',

    //话题||发现分析目标
    NORMAL_FEED_ITEM_SELECTOR: '.feed-item',

    //话题URL
    TOPIC_URL: 'https://www.zhihu.com/topic',

    //发现URL
    EXPLORE_URL: 'https://www.zhihu.com/explore'


};
export default Config;