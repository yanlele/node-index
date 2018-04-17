const users = require('./users');

function router(app) {
    /* GET home page. */
    app.use('/', users);
}

module.exports = router;
