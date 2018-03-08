'use strict';
const assert = require('power-assert');
module.exports = function() {
    describe('Tool', function() {
        let tool;
        before(function() {
            tool = require('../..//tool');
        });
        it('Call filterLimitData', function (done) {
            let data = {
                test: 'test',
                password: '123',
                oldPassword: 'oldPassword',
                email: 'email'
            };
            let result = tool.filterLimitData(data);
            done(assert(!result.password && !result.oldPassword && !result.email));
        });
    });
};