class Watcher {
    constructor(data) {
        this.vm = {};
        this.data = data;
        this.cache = {};
        for(let key in this.data) {
            Object.defineProperty(this.data, key, {
                get: () => {
                    return this.vm[key] = this.data[key]
                },

                set: (newValue)=> {
                    this.$on(newValue);
                    return this.vm[key] = newValue;
                }
            })
        }

    }

    $on(key, callback) {
        // your code 
        this.cache[key] = callback
    }

    $emit(key, value) {
        // your code 
        this.data[key] = value;
        Object.keys(this.cache).map((cacheKey) => {
            if(key === cacheKey) {
                this.cache[cacheKey]();
            }
        })
    }
}

const w = new Watcher({a: 1});
w.$on('a', (v) => {
    console.log('first ', v)
});
w.$on('a', (v) => {
    console.log('second ', v)
});
w.a = 2;                // console: first 2  second 2  


w.$emit('a', 3);        // console: first 3  second 3 

w.a === 3; // true