/**
 * Created by 晴小篆-颜乐 on 2017/1/26.
 * 移动端触摸控制移动
 * function('元素名称'，上边距，下边距)
 */
module.exports = function touch(element, top, bottom) {
    var width, height;
    var btn = $(element).get(0);
    btn.addEventListener('touchstart', function (e) {
        width = $(this).width();
        height = $(this).height();
        var touch = e.changedTouches[0];
        var x = touch.pageX, y = touch.pageY;
    });

    btn.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var touch = e.changedTouches[0];
        var moveX = touch.pageX, moveY = touch.pageY;
        btn.style.position = 'absolute';
        btn.style.left = moveX - width / 2 + 'px';
        btn.style.top = moveY - height / 2 + 'px';
    });

    btn.addEventListener('touchend', function (e) {
        btn.style.position = 'fixed';
        var changeMoveY = e.changedTouches[0].pageY - $(document).scrollTop() - height / 2;
        var topLine = top;
        var bottomLine = $(window).height() - bottom - height;
        var touch = e.changedTouches[0];
        var endX = touch.pageX, endY = touch.pageY - $(document).scrollTop();
        if (endX < $(window).width() / 2) {
            btn.style.left = '5%';
        } else {
            btn.style.left = '85%';
        }

        if (endY < topLine) {
            btn.style.top = topLine + 'px'
        } else if (endY > bottomLine) {
            btn.style.top = bottomLine + "px"
        } else {
            btn.style.top = changeMoveY + 'px';
        }
    })
}