/**
 * create by yanle
 * create time 2018/12/11 上午10:04
 */


let vm = {};
let data = {
    pageNum: 3,
};

let key, value;
for (key in data) {
    (function (key) {
        Object.defineProperty(vm, key, {
            get: function () {
                console.log('get', data[key]);
                return data[key];
            },
            set: function (newValue) {
                console.log('set', newValue);
                data[key] = newValue;
            }
        })
    })(key)
}
