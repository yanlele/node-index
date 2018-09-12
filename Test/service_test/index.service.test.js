const expect = require('chai').expect;

const app = require('../../service/express/app');
const request = require('supertest')(app);
/*request.get('/api/user').expect(200).end((err, response) => {
    console.log(response.body)
});*/

module.exports = function() {
    describe('check user server', function () {
        it('检查基本信息', function (done) {
            request
                .get('/api/user')
                .expect(200)
                .set('token', '')
                .end((err,res) => {
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
                    console.log(res.error);
                    expect(res.status).not.equal(200);
                    done()
                })
        });
    });
};

