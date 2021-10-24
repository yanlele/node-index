let article = [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9];    // 里面存放的是新闻对象
let dom = null,                 // 缓存创建的新闻标题元素
    paper = 0,                  // 当前页数
    num = 5,                    // 每一页显示新闻数目
    i = 0,                      // 创建新闻元素时候保存变量
    len = article.length;       // 新闻数据长度
for (; i < len; i++) {
    dom = document.createElement('div');
    dom.innerHTML = article[i];
    if (i >= num) {
        dom.style.display = 'none'
    }
    document.getElementById('container').appendChild(dom)
}
// 下一页绑定事件
document.getElementById('next_page').onclick = function () {
    let div = document.getElementById('container').getElementsByTagName('div'),
        j = k = n = 0,
        n = ++paper % Math.ceil(len / num) * num;
    for (; j < len; j++) {
        div[j].style.display = 'none';
    }
    for (; k < 5; k++) {
        if (div[n + k]) {
            div[n + k].style.display = 'block'
        }
    }
};