/**
 * create by yanlele
 * create time 2018-11-29 18:15
 */

function throttle(func, wait) {
    let previous = 0;
    let context, args, time, remaining;

    return function() {
        let now = +new Date();
        context = this;
        args = arguments;
        remaining = wait - (now - previous);    // 剩余的还需要等待的时间
        if (remaining <= 0) {
            func.apply(context, args);
            previous = now // 重置“上一次执行”的时间
        } else {
            if (time) {
                clearTimeout(time);
            }
            time = setTimeout(() => {
                func.apply(context, args);
                time = null;
                previous = +new Date() // 重置“上一次执行”的时间
            }, remaining) //等待还需等待的时间
        }
    };
}