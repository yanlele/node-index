# 音乐播放插件

## 说明
主要目的是为了解决音乐初始化播放问题， 但是也会有兼容性问题存在                    


## 基本信息
作者：yanle@zbj.com            
更新时间： 2018.07.16                    

## 使用示例：
html：           
```html
{{#extend "layout"}}
{{#content "header"}}{{/content}}
{{#content "footer"}}{{/content}}
{{#content "body" }}




<h1>移动端小游戏</h1>
测试一下背景音乐自动播放的问题：

<audio id="bg-music" preload="auto" src="{{mapNode 'nodejs-ipr-mh5-web:/pages/test/static/bg.mp3'}}" loop="loop">不支持播放</audio>

<br>
<button class="J-pay">暂停</button>


{{/content}}
{{/extend}}
```

js:             
```javascript
const playMusic = require('nodejs-ipr-mh5-web:/components/business-empire/playMusic/index.js');

let index = {
    init: function() {
        playMusic.init();
    }
};

index.init();
```

源码：             
```javascript
let index = {
    init: function () {
        let _this = this;
        document.onreadystatechange = function () {
            if (document.readyState === 'complete') {
                _this.autoPlayMusic();
                _this.audioAutoPlay();
            }
        };
    },

    audioAutoPlay: function () {
        var audio = document.getElementById('bg-music');
        audio.play();
        document.addEventListener('WeixinJSBridgeReady', function () {
            audio.play();
        }, false);
    },

    // 音乐播放
    autoPlayMusic: function () {
        let _this = this;

        // 自动播放音乐效果，解决浏览器或者APP自动播放问题
        function musicInBrowserHandler() {
            _this.musicPlay(true);
            document.body.removeEventListener('touchstart', musicInBrowserHandler);
        }

        document.body.addEventListener('touchstart', musicInBrowserHandler);

        // 自动播放音乐效果，解决微信自动播放问题
        function musicInWeixinHandler() {
            _this.musicPlay(true);
            document.addEventListener('WeixinJSBridgeReady', function () {
                _this.musicPlay(true);
            }, false);
            document.removeEventListener('DOMContentLoaded', musicInWeixinHandler);
        }

        document.addEventListener('DOMContentLoaded', musicInWeixinHandler);
    },

    musicPlay: function (isPlay) {
        var media = document.querySelector('#bg-music');
        if (isPlay && media.paused) {
            media.play();
        }
        if (!isPlay && !media.paused) {
            media.pause();
        }
    }
};
module.exports = index;
```

