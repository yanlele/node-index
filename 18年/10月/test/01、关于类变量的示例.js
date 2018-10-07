/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-07 20:49
 */

class Data {
    constructor() {
        this.map = new Map();
    }

    static getInstance() {
        if(!Data.instance) {
            Data.instance = new Data();
        }
        return Data.instance
    }

    put(key, value) {
        this.map.set(key, value);
        return this;
    }

    get(key) {
        return this.map.get(key);
    }

    // 销毁
    destroy() {
        for(let value of this.map.values()) {
            value = null;
        }
    }
}

let data = new Data();
data.name = 'yanle';
console.log(data);

console.log(Data.getInstance());