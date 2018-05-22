(function(){
    function isObject(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }
    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }
    function duplicate(arr) {
        var tmp;
        if (!arr || arr.length === 0) {
            return [];
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            tmp = arr[i];
            if (isArray(tmp)) {
                for (var j = i + 1; j < len; j++) {
                    if (isArray(arr[j]) && tmp.length === arr[j].length) {
                        var flag = false;
                        for (var k = 0; k < tmp.length; k++) {
                            if (tmp[k] !== arr[j][k]) {
                                flag = true;
                                break;
                            }
                        }
                        if (!flag) {
                            arr.splice(j, 1);
                            len--;
                            j--;
                        }
                    }
                }
            } else if (isObject(tmp)) {
                for (var j = i + 1; j < len; j++) {
                    if (isObject(arr[j])) {
                        var tmpKey = [], objKey = [], flag = false;
                        for (var k in tmp) {
                            tmpKey.push(k);
                        }
                        for (var l in arr[j]) {
                            objKey.push(l);
                        }
                        if (tmpKey.length === objKey.length) {
                            for (var key in tmp) {
                                if (tmp[key] !== arr[j][key]) {
                                    flag = true;
                                    break;
                                }
                            }
                        }
                        if (!flag) {
                            arr.splice(j, 1);
                            len--;
                            j--;
                        }
                    }
                }
            } else {
                for (var j = i + 1; j < len; j++) {
                    if (tmp === arr[j]) {
                        arr.splice(j, 1);
                        len--;
                        j--;
                    }
                }
            }
        }
        return arr;
    }

    var list = [{"id":1, "name": "AA"}, {"id":1, "name": "AA"}, {"id":1, "name": "AA"}, {"id":2, "name": "BB"}];
    var ls = [{"id":1, "name": "AA"}, {"id":1, "name": "AA"}, [12, 23], [12, 23], [12, 23, 34], {"xxx": "yyy", "id": 2}, "aa", "aa", "aabb"];
    var list2 = duplicate(list);
    var ls2 = duplicate(ls);

    console.log(list2);
    console.log(ls2);
})();