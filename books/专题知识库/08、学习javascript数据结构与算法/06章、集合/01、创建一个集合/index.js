class Set{
    constructor() {
        this.items = {};
    }

    has(value) {
        return this.items.hasOwnProperty(value);
    }

    add(value) {
        if(!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }

    remove(value) {
        if(this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }

    clear() {
        this.items = {};
    }

    size() {
        return Object.keys(this.items).length;
    }

    values() {
        return Object.keys(this.items);
    }
}

module.exports = Set;