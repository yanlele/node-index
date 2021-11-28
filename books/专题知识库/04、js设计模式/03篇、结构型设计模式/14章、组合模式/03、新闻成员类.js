let News = require('./01、一个新闻模块的例子');
let inheritPrototype = require('./inheritPrototype');

/*新闻成员类*/
// 创建图片新闻
let ImageNews = function (url, href, className) {
    News.call(this);
    this.url = url;
    this.href = href;
    this.callName = className || '';
    this.init();
};
inheritPrototype(ImageNews, News);
ImageNews.prototype.init = function () {
    this.element = document.createElement('a');
    let img = new Image();
    img.src = this.url;
    this.element.appendChild(img);
    this.element.className = 'image-news' + this.callName;
    this.element.href = this.href;
};
ImageNews.prototype.add = function(){};
ImageNews.prototype.getElement = function () {
    return this.element;
};

/*基类新闻*/
//带标签的新闻
let IconNews = function (text, href, type) {
    News.call(this);
    this.text = text || '';
    this.href = href || '#';
    this.type = type || 'video';
    this.init();
};
inheritPrototype(IconNews, News);
IconNews.prototype.init = function () {
    this.element = document.createElement('a');
    this.element.innerHTML = this.text;
    this.element.href = this.href;
    this.element.className = 'icon' + this.type;
};
IconNews.prototype.add = function(){};
IconNews.prototype.getElement = function () {
    return this.element;
};

// 最简单的新闻
let EasyNews = function (text, href) {
    News.call(this);
    this.text = text || '';
    this.href = href || '#';
    this.init();
};
inheritPrototype(EasyNews, News);
EasyNews.prototype.init = function () {
    this.element = document.createElement('a');
    this.element.innerHTML = this.text;
    this.element.href = this.href;
    this.element.className = 'text';
};
EasyNews.prototype.add = function(){};
EasyNews.prototype.getElement = function () {
    return this.element;
};

// 左边插入的新闻类
let TypeNews = function (text, href, type, pos) {
    News.call(this);
    this.text = text || '';
    this.href = href || '#';
    this.type = type || '';
    this.pos = pos || 'left';
    this.init();
};
inheritPrototype(TypeNews, News);
TypeNews.prototype.init = function () {
    this.element = document.createElement('a');
    if(this.pos === 'left') {
        this.element.innerHTML = `[ ${this.type} ] ${this.text}`;
    } else {
        this.element.innerHTML = `${this.text} [ ${this.type} ]`;
    }
    this.element.href = this.href;
    this.element.className = 'text';
};
TypeNews.prototype.add = function(){};
TypeNews.prototype.getElement = function () {
    return this.element;
};

module.exports = {
    ImageNews,
    IconNews,
    EasyNews,
    TypeNews
};
