/**
 * create by yanle
 * create time 2019/4/1 12:01 AM
 */

const express = require('express');
const sipder1 = require('./spider1');
const app = express();

sipder1(app);

const server = app.listen(3000, ()=> {
    const host = server.address().host;
    const port = server.address().port;
    console.log('Your App is running at http://%s:%s', host, port);
});
