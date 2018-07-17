# 数字滚动展示组件countUp.js

## 总体概要
[https://github.com/inorganik/countUp.js](https://github.com/inorganik/countUp.js)
[demo: http://inorganik.github.io/countUp.js/](http://inorganik.github.io/countUp.js/)
[源码可以看这里](../../../lib/countUp/countUp.js)

## 使用说明：                
简单的使用示例：            
```html
<div id="box"></div>
<script src="../../../lib/countUp/countUp.js"></script>
<script type="text/javascript">
    let options = {
        useEasing: true,
        useGrouping: false,
        separator: ',',
        decimal: '.',
    };
    let demo = new CountUp('box', 10, 0, 0, 2.5, options);
    if (!demo.error) {
        demo.start();
    } else {
        console.error(demo.error);
    }
</script>
```

说明：                         
`var CountUp = function(target, startVal, endVal, decimals, duration, options)`                                    
```
// target = id of html element or var of previously selected html element where counting occurs
// startVal = the value you want to begin at
// endVal = the value you want to arrive at
// decimals = number of decimal places, default 0
// duration = duration of animation in seconds, default 2
// options = optional object of options (see below)

self.options = {
		useEasing: true, // toggle easing
		useGrouping: true, // 1,000,000 vs 1000000
		separator: ',', // character to use as a separator
		decimal: '.', // character to use as a decimal
		easingFn: easeOutExpo, // optional custom easing function, default is Robert Penner's easeOutExpo
		formattingFn: formatNumber, // optional custom formatting function, default is formatNumber above
		prefix: '', // optional text before the result
		suffix: '', // optional text after the result
		numerals: [] // optionally pass an array of custom numerals for 0-9
	};
```
