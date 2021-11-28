let Flyweight = require('./02、享元对象');
let article = [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9];    // 里面存放的是新闻对象

let paper = 0,
    num = 5,
    len = article.length;
// 添加五条新闻
for (let i = 0; i < 5; i++) {
    if(article[i]) {
        Flyweight().getDiv().innerHTML = article[i]
    }
}

//给下一页添加一个事件
document.getElementById('next_page').onclick = function () {
    // 如果新闻内容不满足五条返回
    if(article.length < 5) return;
    let n = ++paper * num % len,                // 获取当前页的第一条新闻索引
        j = 0;
    // 插入五条新闻
    for (; j<5;j++) {
        if (article[n+j]) {
            Flyweight().getDiv().innerHTML = article[n+j];
        } else if(article[n+j-len]) {           
            Flyweight().getDiv().innerHTML = article[n+j-len];
        } else {
            Flyweight().getDiv().innerHTML = ''
        }
    } 
};