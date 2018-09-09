'use strict';
const helpers = require('handlebars-helpers');

// 外部helper
module.exports = function(handlebars) {
    helpers(['array', 'comparison', 'date', 'logging', 'math', 'number', 'path', 'regex', 'string', 'url'], {
        handlebars: handlebars
    });
};