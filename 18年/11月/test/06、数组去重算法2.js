/**
 * create by yanlele
 * create time 2018-11-23 12:36
 */

let arrNumber = [11, 11, 23, 4, 5, 6, 7, 88, 88, 11];

let unique1 = function (arr) {
    let n  = [];
    for (let i = 0; i < arr.length -1 ;i++) {
        if (n.indexOf(arr[i]) === -1) {
            n.push(arr[i])
        }
    }

    return n;
};


let unique2 = function (arr) {
    let n = {}, r = [], len = arr.length, val, type;
    for (let i  = 0; i< len; i++) {
        val = arr[i];
        type = typeof val;
        if(!n[val]) {
            n[val] = [type];
            r.push(val);
        } else if (n[val].indexOf(type) === -1) {
            n[val].push(type);
            r.push(val)
        }
    }
    return r;
};


let unique3 = function (arr) {
    let n = [];
    for (let i  = 0;i< arr.length;i++) {
        if(arr.indexOf(arr[i] === i)) {
            n.push(arr[i])
        }
    }
    return n
};


let unique4 = function (arr) {
    arr.sort();
    let re = [];
    for(let i = 0 ; i < arr.length ; i++) {
        if(arr[i] !== re[re.length - 1]) {
            re.push(arr[i])
        }
    }
    return re;
};
