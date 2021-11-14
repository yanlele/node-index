## 去重的研究


```js
//1、遍历法：

// 最简单数组去重法
function unique1(array) {
    var n = []; //一个新的临时数组
    //遍历当前数组
    for (var i = 0; i < array.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(array[i]) === -1) n.push(array[i]);
    }
    return n;
}

arr = [11, 23, 4, 5, 6, 7, 88, 88, 11];
console.log(unique1(arr));

//2、对象键值对法
// 速度最快， 占空间最多（空间换时间）就是占用的内存大一些
function unique2(array) {
    var n = {}, r = [], len = array.length, val, type;
    for (var i = 0; i < array.length; i++) {
        val = array[i];
        type = typeof val;
        if (!n[val]) {
            n[val] = [type];
            r.push(val);
        } else if (n[val].indexOf(type) < 0) {
            n[val].push(type);
            r.push(val);
        }
    }
    return r;
}

//3、数组下标判断法
function unique3(array) {
    var n = [array[0]]; //结果数组
    //从第二项开始遍历
    for (var i = 1; i < array.length; i++) {
        //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
        //那么表示第i项是重复的，忽略掉。否则存入结果数组
        if (array.indexOf(array[i]) === i) n.push(array[i]);
    }
    return n;
}

//4、排序后相邻去除法
// 将相同的值相邻，然后遍历去除重复值
function unique4(array) {
    array.sort();
    var re = [array[0]];
    for (var i = 1; i < array.length; i++) {
        if (array[i] !== re[re.length - 1]) {
            re.push(array[i]);
        }
    }
    return re;
}

//5、优化遍历数组法
if (!Array.prototype.indexOf) {
    // 新增indexOf方法
    Array.prototype.indexOf = function (item) {
        var result = -1, a_item = null;
            if (this.length === 0) {
                return result;
        }
        for (var i = 0, len = this.length; i < len; i++) {
            a_item = this[i];
            if (a_item === item) {
                result = i;
                break;
            }
        }
        return result;
    }
}
```
