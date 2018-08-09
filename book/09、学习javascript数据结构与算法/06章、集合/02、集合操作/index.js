class Set {
    constructor() {
        this.items = {};
    }

    has(value) {
        return this.items.hasOwnProperty(value);
    }

    add(value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }

    remove(value) {
        if (this.has(value)) {
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

    // 并集
    union(otherSet) {
        let unionSet = new Set();
        let values = this.values();

        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }

        return unionSet;
    }

    // 交集
    intersection(otherSet) {
        let intersectionSet = new Set();
        let values = this.values();

        for (let i = 0; i < values.length; i++) {
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i]);
            }
        }
        return intersectionSet;
    }

    //差集
    difference(otherSet) {
        let difference = new Set();
        let values = this.values();

        for (let i = 0; i < values.length; i++) {
            if (!otherSet.has(values[i])) {
                difference.add(values[i]);
            }
        }
        return difference;
    }

    // 检验是否为子集
    subset(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        } else {
            let values = this.values();
            for (let i = 0; i < values.length; i++) {
                if(!otherSet.has(values[i])) {
                    return false;
                }
            }
            return true;
        }
    }
}

module.exports = Set;