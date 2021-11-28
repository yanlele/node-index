/**
 * create by yanle
 * create time 2019/1/2 下午5:11
 */

const Mediator = require('./01、创建中介者对象');

/**
 * 隐藏导航方法
 * @param mod   模块
 * @param tag   标签
 * @param showOrHide    是否隐藏（show/hide）
 */
let showHideNavWidget = function (mod, tag, showOrHide) {
    // 获取导航
    let dom = document.getElementById(mod);
    // 过去tag
    let tags = dom.getElementsByTagName(tag);
    let isShowOrHide = (!showOrHide || showOrHide === 'hide') ? 'hidden' : 'visible';
    tags.forEach(function (item) {
        item.style.visibility = isShowOrHide;
    })
};


const mediator = new Mediator();

// 订阅隐藏用户收藏导航消息提示信息
mediator.register('hideAllNavNum', function () {
    showHideNavWidget('collection_nav', 'b', false);
});
// 订阅现实用户收藏导航消息提示信息
mediator.register('showAllNavNum', function () {
    showHideNavWidget('collection_nav', 'b', true);
});
// 订阅隐藏用户收藏导航网址信息
mediator.register('hideAllNavUrl', function () {
    showHideNavWidget('collection_nav', 'span', false);
});
// 订阅现实用户收藏导航网址信息
mediator.register('showAllNavUrl', function () {
    showHideNavWidget('collection_nav', 'span', true);
});

// 发布消息
let hideNum = document.getElementById('hide_num'),
    hideUrl = document.getElementById('hide_url');
// 消息提示选框事件
hideNum.onchange = function () {
    if(hideNum.checked) {
        mediator.send('hideAllNavNum');
    } else {
        mediator.send('showAllNavNum');
    }
};

// 网址选框事件
hideUrl.onchange = function () {
    if(hideUrl.checked) {
        mediator.send('hideAllNavUrl');
    } else {
        mediator.send('showAllNavUrl');
    }
};