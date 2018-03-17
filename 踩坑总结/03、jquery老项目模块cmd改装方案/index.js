(function(root,factory){
    'use strict';

    //CommonJS module
    if(typeof module!=='undefined'&&module.exports){
        module.exports=factory(root.jQuery);
    }
    //AMD module
    else if(typeof define ==='function' && define.amd){
        define(['jquery'],function($){
            factory($);
        });
    }
    //CMD module
    else if(typeof define === 'function' && define.cmd){
        define(function(require,exports,module){
            module.exports=factory(root.jQuery);
        });
    }else{
        factory(root.jQuery)
    }
})(this,function($){
    //组件逻辑代码
});