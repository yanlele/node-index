/**
 * create by yanle
 * create time 2019/1/3 下午2:15
 */

/*
* 同步变量迭代器
* 我们操作页面中的同步变量的内的某些属性值的时候， 我们不知道服务器端是否将该属性或者该属性的上级正确的打印到页面中。
* 所以直接调用会报错， 因此需要每一层做安全校验这样是非常麻烦和臃肿的。
* */

// 同步变量
let A = {
    common: {},
    client: {
        user: {
            username: '颜乐',
            uid: '123'
        }
    },
    server: {}
};

class Iterator {
    constructor(obj) {
        this.obj = obj
    }

    AGetter(key) {
        if (!this.obj) {
            return undefined;
        }
        let result = this.obj;
        key = key.split('.');
        for (let i = 0, len = key.length; i < len; i++) {
            if (result[key[i]] !== undefined) {
                result = result[key[i]];
            } else {
                return undefined;
            }
        }
        return result;
    }

    ASetter(key, value) {
        if (!this.obj) {
            return false;
        }
        let result = this.obj;
        key = key.split('.');
        let i = 0;
        for (let len = key.length; i < len - 1; i++) {
            if(result[key[i]] === undefined) {
                result[key[i]] = {};
            }
            // 如果不是对象是里， 抛出错误
            if(!(result[key[i]] instanceof Object)) {
                throw new Error('A.' + key.splice(0, i+1).join('.') + ' is not object');
                return false;
            }
            result = result[key[i]];
        }
        return result[key[i]] = value
    }
}

let item = new Iterator(A);
console.log(item.AGetter('client.user.username'));
console.log(item.AGetter('client.user.uid'));
console.log(item.AGetter('server.lange.local'));

console.log(item.ASetter('client.module.news.sports', 'on'));
