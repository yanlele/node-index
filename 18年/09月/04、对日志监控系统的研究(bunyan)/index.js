var bunyan = require('bunyan');
const path = require('path');
var log = bunyan.createLogger({
    name: 'myapp',
    stream: path.join(__dirname, '/logs/info.log'),
    level: 'info'
});
log.info();     // Returns a boolean: is the "info" level enabled?
                // This is equivalent to `log.isInfoEnabled()` or
                // `log.isEnabledFor(INFO)` in log4j.

log.info('hi');                     // Log a simple string message (or number).
log.info('hi %s', 'bob', 'anotherVar'); // Uses `util.format` for msg formatting.

log.info({foo: 'bar'}, 'hi');
