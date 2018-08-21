class Index {
    constructor() {
        this.$ = document;
    }

    // 选择器
    query(select) {
        if (select.toString() === '') {
            console.error('不正确的选择器对象')
        }
        let startFlag = select.substr(0, 1);

        switch (select) {
            case startFlag === '.':
                if (this.$.getElementsByClassName(select).length === 1) {
                    return this.$.getElementsByClassName(select)[0]
                }
                return this.$.getElementsByClassName(select);
            case startFlag === '#':
                return this.$.getElementById(select);
            default:
                if (this.$.querySelectorAll(select).length === 1) {
                    return this.$.querySelectorAll(select)[0];
                }
                return this.$.querySelectorAll(select);
        }
    }

    find(select) {
        console.log(select);
    }
}

class Tool {
    static isDOMElement(obj) {
        return !!(obj && typeof window !== 'undefined' && (obj === window || obj.nodeType));
    }
}


(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Index;
    } else {
        factory(global);
    }
}(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    window.dom = new Index();
}));