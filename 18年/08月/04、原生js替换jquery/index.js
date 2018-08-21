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
                    this.dom = this.$.getElementsByClassName(select)[0];
                    return this;
                }
                return this.$.getElementsByClassName(select);
            case startFlag === '#':
                this.dom = this.$.getElementById(select);
                return this;
            default:
                if (this.$.querySelectorAll(select).length === 1) {
                    this.dom = this.$.querySelectorAll(select)[0];
                    return this;
                }
                this.dom = this.$.querySelectorAll(select);
                return this;
        }
    }

    find(select) {
        if(select) {
            if(this.dom.length >= 2) {
                Object.keys(this.dom).map((key) => {
                    console.log(this.dom[key].querySelectorAll(select)[0]);
                    this.dom[key].querySelectorAll(select);
                })
            } else {
                this.dom = this.dom.querySelectorAll(select);
            }
            return this;
        }
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
    window.le = new Index();
}));