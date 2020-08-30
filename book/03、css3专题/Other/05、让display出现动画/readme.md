## 如何让display出现“动画”

因为我读取dom的这些特殊属性时，浏览器就会强制清空渲染队列一次，让我拿到最新的值。
也就是说读取的时候，其实已经是display为"block"了，因此。我们出现了过渡动画。

要注意的一点是，除了手动读取特殊属性清空浏览器渲染队列外，浏览器也会有自己的一个队列阀值，当达到后，会自动清空。
这就是为什么在一个for循环里面多次操作DOM，但是它不会真的渲染那么多次的原因，因为浏览器帮我们维护了一个队列，择机渲染。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        #app {
            width: 200px;
            height: 200px;
            background-color: red;
            display: none;
            transition: all 1s;
        }
    </style>
</head>

<body>
    <div id="app">
    </div>
    <button id="test">测试</button>
</body>
<script>
  test.onclick = function () {
    const app = document.querySelector('#app');
    console.log(app, 'app');
    app.style.display = "block";
    app.offsetHeight;
    app.style.transform = "translateX(200px)";
  }
</script>

</html>
```
