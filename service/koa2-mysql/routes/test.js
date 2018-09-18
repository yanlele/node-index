const router = require('koa-router')()

const routers = router
    .get('/',async function(ctx) {
        ctx.body = {
            name: 'yanle',
            age: 26
        }
    });


module.exports = routers;
