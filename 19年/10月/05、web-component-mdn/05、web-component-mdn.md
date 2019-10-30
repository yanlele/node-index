## 05、web-component-mdn

Web Components旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

- Custom elements（自定义元素）：一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。
- Shadow DOM（影子DOM）：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- HTML templates（HTML模板）： <template> 和 <slot> 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。


### 使用 custom elements

#### 概述
CustomElementRegistry.define() 方法用来注册一个 custom element，该方法接受以下参数：                       
- 表示所创建的元素名称的符合 DOMString 标准的字符串。注意，custom element 的名称不能是单个单词，且其中必须要有短横线。
- 用于定义元素行为的 类 。
- 可选参数，一个包含 extends 属性的配置对象，是可选参数。它指定了所创建的元素继承自哪个内置元素，可以继承任何内置元素。

举一个例子： `customElements.define('word-count', WordCount, { extends: 'p' });`                  

WordCount可以写成下面这样：                      
```js
class WordCount extends HTMLParagraphElement {
  constructor() {
    // 必须首先调用 super 方法
    super();

    // 元素的功能代码写在这里

    ...
  }
}
```

共有两种 custom elements：                                               
`Autonomous custom elements` 是独立的元素，它不继承其他内建的HTML元素。
你可以直接把它们写成HTML标签的形式，来在页面上使用。
例如 `<popup-info>`，或者是`document.createElement("popup-info")`这样。

`Customized built-in elements` 继承自基本的HTML元素。
在创建时，你必须指定所需扩展的元素（正如上面例子所示），使用时，需要先写出基本的元素标签，
并通过 is 属性指定custom element的名称。
例如`<p is="word-count">`, 或者 `document.createElement("p", { is: "word-count" })`。


#### 示例
让我们来看几个简单示例，来了解如何创建 custom elements。                                        

**Autonomous custom elements**                              
一个关于 autonomous custom element的例子。
它包含有一个图标和一段文字，并且图标显示在页面上。在这个图标获取焦点时，它会显示一个包含该段文字的信息框，用于展示更多的信息。
```js
class PopUpInfo extends HTMLElement {
  constructor() {
    // 必须首先调用 super方法 
    super(); 

    // 元素的功能代码写在这里

    ...
  }
}
```

在构造函数中，我们会定义元素实例所拥有的全部功能。                   
```js
class PopUpInfo extends HTMLElement {
  constructor() {
    super();

    // 创建一个 shadow root
    const shadow = this.attachShadow({mode: 'open'});

    // 创建一个span
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const icon = document.createElement('span');
    icon.setAttribute('class', 'icon');
    icon.setAttribute('tabindex', '0');

    const info = document.createElement('span');
    info.setAttribute('class', info);

    // 获取 text 属性上面的内容， 添加到一个 span 标签内
    info.textContent = this.getAttribute('text');

    // 插入icon
    let imageUrl;
    if (this.hasAttribute('img')) {
      imageUrl = this.getAttribute('img')
    } else {
      imageUrl = 'img/default.png'
    }

    const img = document.createElement('img');
    img.src = imageUrl;
    icon.appendChild(img);

    // 创建css
    const style = document.createElement('style');

    style.textContent = ''; // 省略了

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    shadow.appendChild(icon);
    shadow.appendChild(info);
  }
}

window.customElements.define('popup-info', PopUpInfo);
```


现在我们可以在页面上使用我们定义的custom element了，就像下面这样                     
```html
<popup-info 
    img="img/alt.png" 
    text="Your card validation code (CVC)
      is an extra security feature — it is the last 3 or 4 numbers on the
      back of your card."
    >
```

`customElements.define()`必须在js文件中调用，且引用此js文件时必须在script标签上添加defer属性，
否则this.getAttribute('属性名称')无法获取到值。


**Customized built-in elements**

现在让我们来看一下另一个有关customized built in element（自定义内置元素）                          
该示例将所有的无序列表转化为一个可收起/展开的菜单。

首先，我们定义一个元素的类，这和之前一样：
```js
class ExpandingList extends HTMLUListElement {
  constructor() {
    // 必须首先调用 super方法 
    super();

    // 元素的功能代码写在这里

    ...
  }
}
```

元素继承的是HTMLUListElement 接口，而不是HTMLElement。
所以它拥有<ul> 元素所有的特性，以及在此基础上我们定义的功能，这是与独立元素（standalone element）不同之处。
这也是为什么我们称它为 customized built-in元素，而不是一个autonomous元素。

`customElements.define('expanding-list', ExpandingList, { extends: "ul" });`                

在页面上使用 built-in element看起来也会有所不同：                   
```html
<ul is="expanding-list">
  ...
</ul>
```

你可以正常使用<ul>标签，也可以通过is属性来指定一个custom element的名称。






### 参考文章
- [https://developer.mozilla.org/zh-CN/docs/Web/Web_Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)


