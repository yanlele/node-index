const users = require('./users');

function router(app) {
    /* GET home page. */
    app.use('/', function (req, res, next) {
        res.render('index',{
            title: 'yanle express'
        })
    });
    app.use('/user', users);
}

module.exports = router;
