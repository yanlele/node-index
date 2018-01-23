const router = require('koa-router')()

// router.prefix('/users')

const userInfoController = require('../constrollers/user-info');

const routers = router
    .get('/getUserInfo.json', userInfoController.getLoginUserInfo)
    .post('/signIn.json', userInfoController.signIn)
    .post('/signUp.json', userInfoController.signUp)


module.exports = routers
