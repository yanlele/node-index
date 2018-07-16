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