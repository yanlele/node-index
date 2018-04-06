//首先要判断是不是PC端（其实这一步可以省略，因为只有在微信里面才能分享）
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

//第二步：获取微信JS-SDK：
//直接引入就可以    http://res.wx.qq.com/open/js/jweixin-1.2.0.js

//第三部：配置权限：
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}

var flag = IsPC();

var str1 = window.location.href.lastIndexOf('weixin');
var domain = window.location.href.slice(0, str1);

console.log(domain)

if (!flag) {
    $.ajax({
        type: "POST",
        url: "获取权限的url地址",
        dataType: "html",
        async: false,
        data: {url: domain + "weixin/share.html"},
        success: function (dataStr) {
            var data = $.parseJSON(dataStr);
            configwx(data.result);
        },
        error: function (xhr, status, error) {
            alert(status);
            alert(xhr.responseText);
        }
    });
}

//下面是微信的配置信息
function configwx(configs) {
    var wx = window.wx;
    wx.config({
        debug: false,
        appId: configs.appId,
        timestamp: configs.timestamp,
        nonceStr: configs.nonceStr,
        signature: configs.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    });

    /*        wx.error(function (res) {
                alert(res.errMsg)
            });*/
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: '***',
            desc: '描述',
            link: domain + 'share/showQrCode.html?id=' + id,
            imgUrl: domain + 'img/share/share-icon.jpg',
            type: 'link',
            dataUrl: ''
        });
        wx.onMenuShareTimeline({
            title: '***',
            desc: '描述',
            link: domain + 'share/showQrCode.html?id=' + id,
            imgUrl: domain + 'img/share/share-icon.jpg'
        });
        wx.onMenuShareQQ({
            title: '***',
            desc: '描述',
            link: domain + 'share/showQrCode.html?id=' + id,
            imgUrl: domain + 'img/share/share-icon.jpg',
        });
        wx.onMenuShareQZone({
            title: '***',
            desc: '描述',
            link: domain + 'share/showQrCode.html?id=' + id,
            imgUrl: domain + 'img/share/share-icon.jpg',
        });
        wx.onMenuShareWeibo({
            title: '***',
            desc: '描述',
            link: domain + 'share/showQrCode.html?id=' + id,
            imgUrl: domain + 'img/share/share-icon.jpg',
        })
    })
}