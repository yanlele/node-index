api = {
    name: 'yanle',
    _age: 25,
};

api = new Proxy(api, {
    get: function (target, key) {
        if(key.startsWith('_')) {
            console.log('私有变量，无法访问');
            return false;
        }
        return target[key];
    },

    set: function (target, key ,value) {
       if(key.startsWith('_')) {
           console.log('私有变量，无法访问');
           return false;
       }
       target[key] = value;
    },

    has: function(target, key) {
        return key.startsWith('_') ? false : (key in target);
    }
});

api._age = 35;
console.log(api.name)