const app = require('../service/express/app');
const request = require('supertest')(app);
request.get('/api/user').expect(200).end((err, response) => {
    console.log(response.body)
});