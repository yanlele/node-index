## 04篇、node层服务端api接口测试

### <div id="class04-01">01、编写单元测试</div>
最基本流程是：
```
为 app 创建 http 服务器
对各个 API 发出请求
对响应内容进行断言
```
幸运的是，社区里已经有相应的工具让我们可以方便管理这个流程，这个工具就是 —— supertest。                  
它提供了非常灵活的 API，足以帮助我们测试 Restful API 了。                   

基本用法如下：
```javascript
const app = require('../service/express/app');
const request = require('supertest')(app);
request.get('/api/user').expect(200).end((err, response) => {
    console.log(response.body)
});
```





### 参考资料
[在 Node.js 中为 Restful API 编写单元测试](http://scarletsky.github.io/2016/10/05/write-unit-tests-for-restful-api-in-nodejs/)