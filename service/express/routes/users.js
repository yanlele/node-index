var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        name: 'yanle',
        age: 26
    });
});

router.post('/message/', function(req, res, next) {
    new Promise((resolve, reject) => {
        if(req.body.message) {
            resolve({
                message: 'you get message' + req.body.message,
                time: new Date()
            });
        } else {
            reject(new Error('no req message'))
        }
    }).then((data) => {
        res.send(data)
    }).catch(next);
});

module.exports = router;
