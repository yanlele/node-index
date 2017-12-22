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