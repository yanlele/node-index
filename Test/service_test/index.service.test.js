const expect = require('chai').expect;
const app = require('../../service/express/app');
const koa = require('../../service/koa2-mysql/app');
const request = require('supertest')(app);
const requestKoa = require('supertest')(koa.listen(3000));


describe('service', function () {
    describe('express check user server', function () {
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

    describe('koa service', function () {
        it('检测一个get请求', function (done) {
            requestKoa
                .get('/test')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.body).is.a.string;
                    done();
                })
        });
    })
});

