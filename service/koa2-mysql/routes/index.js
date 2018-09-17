/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const home = require('./home');
const user=require('./users');
const test = require('./test');

router.use('/test', test.routes(), test.allowedMethods());
router.use('/user',user.routes(),user.allowedMethods());
router.use('/test', home.routes(), test.allowedMethods());

module.exports = router;



