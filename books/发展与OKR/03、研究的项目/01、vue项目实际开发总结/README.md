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


/*自定义模板过滤器*/
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

## 4、在app.vue里面可以配置axios的全局拦截
```javascript
    /*配置全局的请求拦截器和响应拦截器*/
    this.axios.interceptors.response.use((res) => {
      //在这里对返回的数据进行处理
      if (res.status === 302) {//302重定向的话，全部都自动刷新页面
        window.location.href=res.headers.Location
      }
      this.$dialog.loading.close();
      return res;
    }, (err) => {
      //Do something with response error
      this.$router.push({
        path: '/error'
      });
      this.$dialog.loading.close();
      return Promise.reject(err);
    });
```

## 5、切换banner的时候，需要转换的一些出发情况：router-link-active
```html
    <template>
        <footer class="fn-clear">
          <router-link to="/home">
            <b class="home-ico"></b><span>主页</span>
          </router-link>
          <router-link to="/raffle">
            <b class="prizedraw-ico"></b><span>抽奖</span>
          </router-link>
          <router-link to="/integralMall" >
            <b class="integral-ico"></b><span>商城</span>
          </router-link>
          <router-link to="/newCenter">
            <b class="my-ico"></b><span>我的</span>
          </router-link>
        </footer>
    </template>
    
    <script type="text/ecmascript-6">
    
    </script>
    
    
    <style scoped>
     .router-link-active{ color:#ed801a;}
     .router-link-active b.home-ico{ background:url(../../images/home-ico2.png) no-repeat center center; background-size:auto 2.1rem;}
     .router-link-active b.prizedraw-ico{ background:url(../../images/prizedraw-ico2.png) no-repeat center center; background-size:auto 2.3rem;}
     .router-link-active b.integral-ico{ background:url(../../images/integral-ico2.png) no-repeat center center; background-size:auto 2.4rem;}
     .router-link-active b.my-ico{ background:url(../../images/my-ico2.png) no-repeat center center; background-size:auto 2.4rem;}
    </style>
```

## 6、如果页面没有一个整页面的内容，然后需要背景图沾满整个页面的情况解决办法
```html
    <template>
      <div v-title data-title="全民抢车" class="htmlbg" ref="body">
      </div>
    </template>  
    
    <script>
        export default {
            mounted(){
              let body = this.$refs.body;
              if (body.clientHeight < window.innerHeight) {
                this.$refs.body.style.height = `${window.innerHeight}px`
              }
            },
        }
    </script>
```

## 7、路由相关的重要操作
- 1、路由跳转传参和获取参数         
编程式跳转：
```javascript
    this.$router.replace({
      path: '/addBankCard',
      query:{
        bankCode:this.name
      }
    })
    
    this.$router.push({
      path: '/addBankCard',
      query:{
        bankCode:this.name
      }
    })
```
html式跳转：
```html
<router-link tag="i" :to="{path:'/level',query:{level:this.info.level}}" :class="levelImg"></router-link>
```

参数的获取：
```javascript
this.$route.query;
```

## 8、路由守卫的基本使用
在一个vue组件中，直接使用就可以了
```javascript
    beforeRouteLeave(to, from, next){
      this.setTicketData({
        transferBox: false
      });
      next();
    }
```
## 9、router 配置
```javascript
import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/home'

Vue.use(Router);
const router = new Router({
    routes:[
         {
          path: '/myOrder',
                component: myOrder,
                children: [
                  {
                    path: 'allOrder',
                    component: allOrder
                  },
                  {
                    path: 'lose',
                    component: lose
                  },
                  {
                    path: 'refundError',
                    component: refundError
                  },
                  {
                    path: 'refunding',
                    component: refunding
                  },
                  {
                    path: 'refundSuccess',
                    component: refundSuccess
                  },
                  {
                    path: 'waitingPay',
                    component: waitingPay
                  }
                ]
         }
    ]
});

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});


export default router;
```


