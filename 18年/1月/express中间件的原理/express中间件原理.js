function App() {
    if (!(this instanceof App))
        return new App();
    this.init();
}
App.prototype = {
    constructor: App,
    init: function() {
        this.request = { //模拟的request
            requestLine: 'POST /iven_ HTTP/1.1',
            headers: 'Host:www.baidu.com\r\nCookie:BAIDUID=E063E9B2690116090FE24E01ACDDF4AD:FG=1;BD_HOME=0',
            requestBody: 'key1=value1&key2=value2&key3=value3',
        };
        this.response = {}; //模拟的response
        this.chain = []; //存放中间件的一个数组
        this.index = 0; //当前执行的中间件在chain中的位置
    },
    use: function(handle) { //这里默认 handle 是函数，并且这里不做判断
        this.chain.push(handle);
    },
    next: function() { //当调用next时执行index所指向的中间件
        if (this.index >= this.chain.length)
            return;
        let middleware = this.chain[this.index];
        this.index++;
        middleware(this.request, this.response, this.next.bind(this));
    },
}