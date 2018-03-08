'use strict';
const path = require('path');
const nock = require('nock');
const request = require('supertest');
const express = require('express');
const app = express();
const assert = require('power-assert');
nock.enableNetConnect(); // 允许真实的网络连接

module.exports = function () {
    describe('Action', function () {
        let client;
        before(function () {
            client = request(app);
            assert(client);
        });
        it('getAction has referer and params', function (done) {
            client.get('/api/Action?chanceGroupId=123456&occurrenceTime=teseData&serviceId=123456')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Accept', 'application/json')
                .set('referer', 'zbjdev.com')
                .expect(function (res) {
                    assert(res);
                })
                .end(function (err) {
                    done(err);
                });
        });
        it('getAction has no referer', function (done) {
            client.get('/api/Action?chanceGroupId=123456&occurrenceTime=teseData&serviceId=123456')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Accept', 'application/json')
                .expect(function (res) {
                    assert(res);
                })
                .end(function (err) {
                    done(err);
                });
        });
        it('getAction has no params', function (done) {
            client.get('/api/Action')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Accept', 'application/json')
                .set('referer', 'zbjdev.com')
                .expect(function (res) {
                    assert(res);
                })
                .end(function (err) {
                    done(err);
                });
        });


        it('getActionAll has referer and params', function (done) {
            client.get('/api/Action/all?data=123456')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Accept', 'application/json')
                .set('referer', 'zbjdev.com')
                .expect(function(res) {
                    assert(res.body.data);
                })
                .end(function(err) {
                    done(err);
                });
        });
        it('getActionAll has no referer', function (done) {
            client.get('/api/Action/all?data=123456')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Accept', 'application/json')
                .expect(function(res) {
                    assert(res.body);
                })
                .end(function(err) {
                    done(err);
                });
        });
        it('getActionAll has no referer params', function (done) {
            client.get('/api/Action/all')
                .set('X-Requested-With', 'XMLHttpRequest')
                .set('Accept', 'application/json')
                .set('referer', 'zbjdev.com')
                .expect(function(res) {
                    assert(res.body);
                })
                .end(function(err) {
                    done(err);
                });
        });
    });
};

