# vue 项目开发总结

## 1、关于代理
代理一般都是用到了webpack-dev-server 中非常强大的一个包 http-proxy-middleware         
```javascript
// 代理配置表，在这里可以配置特定的请求代理到对应的API接口
// 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
// 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
proxyTable: {
  '/api': {
    target: 'http://xxxxxx.com', // 接口的域名
    // secure: false,  // 如果是https接口，需要配置这个参数
    changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    pathRewrite: {
      '^/api': ''
    }
  }
}
```
接口地址原本是 /save/index，但是为了匹配代理地址，在前面加一个 /api,  因此接口地址需要写成这样的即可生效 /api/save/index。     
注意： '/api' 为匹配项，target 为被请求的地址，因为在 ajax 的 url 中加了前缀 '/api'，而原本的接口是没有这个前缀的，所以需要通过 pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。如果本身的接口地址就有 '/api' 这种通用前缀，就可以把 pathRewrite 删掉。         

## 2、加入百度统计代码
在index.html中加入如下代码块，这部分代码块由百度统计提供
```javascript
<script>
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?a4c14e14042cc9f444c27a8c2d719317";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
</script>
```
在主入口文件做如下的配置
```javascript
router.beforeEach((to, from, next) => {
  // 统计代码
  if (to.path) {
    _hmt.push(['_trackPageview', '/#' + to.fullPath]);
  }
  next();
});
```

## 3、Vue项目租入口文件配置
main.js
```javascript
import Vue from 'vue'
import App from './App'
import router from './router'
import vue_store from './store';//这里是vuex的配置
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.px.css'
import '@/css/index.css'
import '@/css/common.less'
import qs from 'qs'

import axios from 'axios'

// import '@/base/mock'

var engine = require('store/src/store-engine');
var storages = [
  require('store/storages/localStorage'),
  require('store/storages/cookieStorage')
];
var plugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
];
var store = engine.createStore(storages, plugins);//设置store浏览器缓存策略

Vue.prototype.store = store;
Vue.prototype.axios = axios;
Vue.prototype.qs = qs.stringify;
Vue.use(YDUI);
Vue.config.productionTip = false;

/*动态获取路由的title*/
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
});

/*设置axios公共的header*/
axios.defaults.headers.common = {
  'Content-Type': 'application/x-www-form-urlencoded'
};


/*过滤器*/
Vue.filter('price', function (value) {
  let res = parseFloat(value) / 10000;
  return res.toFixed(2)
});

Vue.filter('two_point', function (value) {
  let res = parseFloat(value);
  return res.toFixed(2)
});

Vue.filter('front_zero', function (value) {
  return '0' + value
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
  store: vue_store
});
```

