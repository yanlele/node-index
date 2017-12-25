let arr='哔哩哔哩'
console.log(/(^[\u4e00-\u9fa5]+)([·]{1})([\u4e00-\u9fa5]+$)|^[\u4e00-\u9fa5]+$/gi.test(arr));