class Dictionary {
    constructor() {
        this.items = {};
    }

    has(key) {
        return key in this.items;
    }

    set(key, value) {
        this.items[key] = value;
    }

    remove(key) {
        if(this.has(key)) {
            delete items[key];
            return true;
        }
        return false;
    }

    get(key) {
        return this.has(key) ? this.items[key] : undefined;
    }

    values(key) {
        let values = {};
        for (let k in this.items) {
            if(this.has(k)) {
                values.push(this.items[k])
            }
        }
        return values;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    keys() {
        return Object.keys(this.items);
    }

    getItems() {
        return this.items;
    }
}

module.exports = Dictionary;