let store = function () {
    let cache = {};
    return {
        addStore: function (key, value) {
            cache[key] = value;
        },

        remove: function (key) {
            if(cache[key]) {
                delete cache[key]
            }
        },

        getStore: function (key) {
            if(key && cache[key]) {
                return cache[key]
            }
            return cache
        }
    }
};


let myStore = store();

myStore.addStore('age', 26);

console.log(myStore.getStore());
console.log(myStore.getStore('age'));


