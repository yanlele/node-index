/**
 * 整合所有子路由
 */

const router = require('koa-router')();

const home = require('./home');
const user=require('./users');

router.use('/', home.routes(), home.allowedMethods());
router.use('/user',user.routes(),user.allowedMethods());

module.exports = router;



