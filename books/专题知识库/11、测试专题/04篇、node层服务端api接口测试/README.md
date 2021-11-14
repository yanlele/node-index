## 04篇、node层服务端api接口测试

### <div id="class04-01">01、编写单元测试基本流程</div>
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
然后直接执行就可以了

> 提示
如果你遇到了 TypeError: app.address is not a function, 请尝试一下以下方法：             
const request = require('supertest').agent(app.listen())




### <div id="">02、api测试的具体实现</div>
```javascript
const expect = require('chai').expect;
const app = require('../../service/express/app');
const request = require('supertest')(app);

describe('check user server', function () {
    it('检查基本信息', function (done) {
        request
            .get('/api/user')
            .expect(200)
            .set('token', '')
            .end((err,res) => {
                console.debug(res.body);
                expect(res.body).have.property('name', 'yanle');
                done()
            })
    });
    it('检测post请求 成功的例子', function (done) {
        request
            .post('/api/user/message')
            .expect(200)
            .send({
                message: 'lelelelelelele'
            })
            .end((err, res) => {
                console.log(res.body);
                expect(res.body).have.property('time');
                done()
            })
    });

    it('检测post请求 失败的例子', function (done) {
        request
            .post('/api/user/message')
            .expect(200)
            .end((err, res) => {
                console.log(res.body);
                console.log(res.status);
                expect(res.status).not.equal(200);
                done()
            })
    });
});
```

如果你遇到了 TypeError: app.address is not a function , 请尝试一下以下方法：                    
`const request = require('supertest').agent(app.listen())`





### 参考资料
[在 Node.js 中为 Restful API 编写单元测试](http://scarletsky.github.io/2016/10/05/write-unit-tests-for-restful-api-in-nodejs/)