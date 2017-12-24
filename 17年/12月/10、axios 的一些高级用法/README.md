# axios 的一些高级用法

> 设置axios公共的header
```javascript
axios.defaults.headers.common = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
```

> 请求拦截
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

> 拦截请求的一个示例
```jsx harmony
import axios from 'axios'
import { Toast } from 'antd-mobile'

// 拦截请求
axios.interceptors.request.use(function(config){
	Toast.loading('加载中',0)
	return config
})

// 拦截相应

axios.interceptors.response.use(function(config){
	setTimeout(()=>{
			Toast.hide()
	},2000)
	
	return config
})
```
把上面这一段拦截的.js文件，直接import到react index.js下面，就可以使用了