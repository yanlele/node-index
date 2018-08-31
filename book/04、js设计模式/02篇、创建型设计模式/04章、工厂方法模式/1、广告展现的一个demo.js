let Java = function(content) {
    this.content = content;
    (function(content) {
        console.log(content)
    })(content);
};

let Php = function(content) {
    this.content = content;
    (function(content) {
        console.log(content)
    })(content);
};

let JavaScript = function(content) {
    this.content = content;
    (function(content) {
        console.log(content)
    })(content);
};

// 学科工厂
function JobFactory(type, content) {
    switch (type) {
        case 'java':
            return new Java(content);
        case 'php':
            return new Php(content);
        case 'javascript':
            return new JavaScript(content);
    }
}
let java = JobFactory('javascript', '我是js书籍');