# mocha测试post和get请求

```javascript
import request from 'superagent';
import 'should';
let base = 'http://localhost:3000';

describe('login', function () {
    it('login 验证', function (done) {
        request
            .post(base+'/api/users/login')
            .send({n:'1234', p: '1'})
            .end(function (err, res) {
                console.log(res);
                res.status.should.eql(200);
                done()
            })
    })
});

describe('user', function () {
    it('获取用户信息', function (done) {
        request
            .get(base+'/api/users/user')
            .set('token','')
            .end((err, res) => {
                console.log('test user:', res.body);
                done();
            })
    })
}) 
```

这是controller层代码的测试，分别一个简单的get方法和post方法，具体的断言可以根据实际情况加入这里只是简单的展示一下使用方法。          
```javascript
import should from 'should';
import FuncDao from '../../dao/func';
const funcImpl = new FuncDao();

describe('dao', function () {
    describe('getFuncInfoByUserId', function () {
        it('获取funcId', function (done) {
            funcImpl.getFuncInfoByUserId('db32f820-0c26-11e6-aacc-7fcf053d8408')
                .then((res) => {
                    console.log('result:', res);
                    done();
                })
        })
    })
});
```