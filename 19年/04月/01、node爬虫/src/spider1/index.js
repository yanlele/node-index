/**
 * create by yanle
 * create time 2019/4/1 12:10 AM
 */

const hotNews = require('./hotNews');

const spider1 = (app) => {
    hotNews(app);
};

module.exports = spider1;