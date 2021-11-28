'use strict';
const path = require('path');
const nock = require('nock');
const request = require('supertest');
const express = require('express');
const app = express();
const assert = require('power-assert');
nock.enableNetConnect(); // 允许真实的网络连接

const apiTest = require('./api/');

describe('#CommonTest', function () {
    let client;
    before(function (done) {
        this.timeout(200000);
        client = request(app);
    });

    apiTest();
});



