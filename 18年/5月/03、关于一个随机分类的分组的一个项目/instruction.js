let colors = require('colors');

let index = {
    init: function() {
        console.log('基础使用说明：'.green);
        console.log('输入 help 查看使用说明'.green);
        console.log('list: '.green, '查看当前所有产品'.blue);
        console.log('outList: '.green, '查看所有已经分类完了的产品'.blue);
        console.log('type: '.green, '按照商品类别分类'.blue);
        console.log('price: '.green, '按照价格区间分类'.blue);
        console.log('address:'.green, '按照生产地区查看分类'.blue);
        console.log('close: '.green, '退出程序'.blue);
    }
};

module.exports = index;