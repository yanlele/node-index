const users = require('./users');

function router(app) {
    /* GET home page. */
    app.use('/home', function (req, res, next) {
        res.render('index',{
            title: 'yanle express',
            array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        })
    });


    app.use('/api/user', users);
}

module.exports = router;
