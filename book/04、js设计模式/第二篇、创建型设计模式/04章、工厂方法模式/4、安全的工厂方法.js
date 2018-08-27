let Factory = function (type, content) {
    if (this instanceof Factory) {
        return new this[type](content);
    } else {
        return new Factory(type, content)
    }
};

Factory.prototype = {
    Java(content) {
        this.content = content;
        (function (content) {
            console.log(content)
        })(content);
    },
    Php(content) {
        this.content = content;
        (function (content) {
            console.log(content)
        })(content);
    },
    JavaScript(content) {
        this.content = content;
        (function (content) {
            console.log(content)
        })(content);
    }
};