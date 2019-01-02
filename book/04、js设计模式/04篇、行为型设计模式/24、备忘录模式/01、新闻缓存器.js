/**
 * create by yanle
 * create time 2019/1/2 下午5:56
 */

class Page {
    constructor() {
        this.cache = {};
    }

    init(page, fn) {
        // 判定是否有缓存
        if(this.cache[page]) {
            // 恢复到该页面的状态 ， 现实该页面的内容
            this.showPage(page, this.cache[page]);
            // 执行成功的回调
            fn && fn();
        } else {
            // 没有cache数据
            $.post('/data/getNewsData.php', {
                page: page
            },  (res) => {
                // 请求成功
                if(res.errno === 0) {
                    // 显示页面数据
                    this.showPage(page, res.data);
                    this.cache[page] = res.data;
                    fn && fn();
                } else {
                    console.log('异常处理');
                }
            })
        }
    }

    showPage(page, data) {
        // 处理页面逻辑
        console.log('处理页面逻辑', page, data)
    }
}