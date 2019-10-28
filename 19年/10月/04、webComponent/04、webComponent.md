## webComponent

谷歌公司由于掌握了 Chrome 浏览器，一直在推动浏览器的原生组件，即 Web Components API。
相比第三方框架，原生组件简单直接，符合直觉，不用加载任何外部模块，代码量小。
目前，它还在不断发展，但已经可用于生产环境。


### 一、自定义元素
本文演示如何把这个卡片，写成 Web Components 组件                        
网页只要插入下面的代码，就会显示用户卡片。                       
```html
<user-card></user-card>
```
这种自定义的 HTML 标签，称为自定义元素（custom element）。
根据规范，自定义元素的名称必须包含连词线，用与区别原生的 HTML 元素。所以，`<user-card>`不能写成`<usercard>`。


### 二、customElements.define()
自定义元素 `<user-card>` 目前还是空的，下面在类里面给出这个元素的内容。
```js
class UserCard extends HTMLElement {
  constructor() {
    super();
  }
}
```
上面代码中，`UserCard`就是自定义元素的类。注意，这个类的父类是`HTMLElement`，因此继承了 HTML 元素的特性。                         
接着，使用浏览器原生的`customElements.define()`方法，告诉浏览器`<user-card>`元素与这个类关联。
```js
window.customElements.define('user-card', UserCard);
```

### 三、自定义元素的内容
自定义元素 `<user-card>` 目前还是空的，下面在类里面给出这个元素的内容。
```js
class UserCard extends HTMLElement {
  constructor() {
    super();

    var image = document.createElement('img');
    image.src = 'https://semantic-ui.com/images/avatar2/large/kristy.png';
    image.classList.add('image');

    var container = document.createElement('div');
    container.classList.add('container');

    var name = document.createElement('p');
    name.classList.add('name');
    name.innerText = 'User Name';

    var email = document.createElement('p');
    email.classList.add('email');
    email.innerText = 'yourmail@some-email.com';

    var button = document.createElement('button');
    button.classList.add('button');
    button.innerText = 'Follow';

    container.append(name, email, button);
    this.append(image, container);
  }
}
```

上面代码最后一行，`this.append()` 的`this`表示自定义元素实例。                  
完成这一步以后，自定义元素内部的 DOM 结构就已经生成了。                  


### 四、<template>标签
使用 JavaScript 写上一节的 DOM 结构很麻烦，Web Components API 提供了<template>标签，可以在它里面使用 HTML 定义 DOM。
```html
<template id="userCardTemplate">
  <img src="https://semantic-ui.com/images/avatar2/large/kristy.png" class="image">
  <div class="container">
    <p class="name">User Name</p>
    <p class="email">yourmail@some-email.com</p>
    <button class="button">Follow</button>
  </div>
</template>
```

然后，改写一下自定义元素的类，为自定义元素加载`<template>`。
```js
class UserCard extends HTMLElement {
  constructor() {
    super();

    var templateElem = document.getElementById('userCardTemplate');
    var content = templateElem.content.cloneNode(true);
    this.appendChild(content);
  }
}
```

上面代码中，获取`<template>`节点以后，克隆了它的所有子元素，这是因为可能有多个自定义元素的实例，这个模板还要留给其他实例使用，
所以不能直接移动它的子元素。
到这一步为止，完整的代码如下。
```html
<body>
  <user-card></user-card>
  <template>...</template>

  <script>
    class UserCard extends HTMLElement {
      constructor() {
        super();

        var templateElem = document.getElementById('userCardTemplate');
        var content = templateElem.content.cloneNode(true);
        this.appendChild(content);
      }
    }
    window.customElements.define('user-card', UserCard);    
  </script>
</body>
```

### 五、添加样式
自定义元素还没有样式，可以给它指定全局样式，比如下面这样。
```
user-card {
  /* ... */
}
```










### 参考资料
- [Web Components 入门实例教程](http://www.ruanyifeng.com/blog/2019/08/web_components.html)
