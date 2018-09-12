const siteTest = require('./testLib/checkId.test');
const fontTool = require('./testLib/fontTool.test');

describe('测试主入口', function () {
    siteTest();
    fontTool();
});

const expect = require('chai').expect;

const app = require('../service/express/app');
const request = require('supertest')(app);
/*request.get('/api/user').expect(200).end((err, response) => {
    console.log(response.body)
});*/
describe('check user server', function (done) {
    it('检查基本信息', function () {
        request
            .get('/api/user')
            .set('token', '')
            .end((err,res) => {
                done()
            })
    });
    it('检测post请求', function () {
        request
            .post('/api/user/message')
            .send({
                message: 'lelelelelelele'
            })
            .end((err, res) => {
                done()
            })
    });
});