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

- [demo1](./demo1/index.js)


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


#### 使用生命周期回调函数
- `connectedCallback`：当 custom element首次被插入文档DOM时，被调用。
- `disconnectedCallback`：当 custom element从文档DOM中删除时，被调用。
- `adoptedCallback`：当 custom element被移动到新的文档时，被调用。
- `attributeChangedCallback`: 当 custom element增加、删除、修改自身属性时，被调用。


我们来看一下它们的一下用法示例。
这个简单示例只是生成特定大小、颜色的方块。custom element看起来像下面这样：
```html
<custom-square l="100" c="red"></custom-square>
```

这里，类的构造函数很简单 — 我们将 shadow DOM附加到元素上，然后将一个<div>元素和<style>元素附加到 shadow root上：
```js
var shadow = this.attachShadow({mode: 'open'});

var div = document.createElement('div');
var style = document.createElement('style');
shadow.appendChild(style);
shadow.appendChild(div);
```

示例中的关键函数是 updateStyle()—它接受一个元素作为参数，然后获取该元素的shadow root，
找到<style>元素，并添加width，height以及background-color样式。
```js
function updateStyle(elem) {
  var shadow = elem.shadowRoot;
  var childNodes = shadow.childNodes;
  for(var i = 0; i < childNodes.length; i++) {
    if(childNodes[i].nodeName === 'STYLE') {
      childNodes[i].textContent = 'div {' +
                          ' width: ' + elem.getAttribute('l') + 'px;' +
                          ' height: ' + elem.getAttribute('l') + 'px;' +
                          ' background-color: ' + elem.getAttribute('c');
    }
  }
}
```

实际的更新操作是在生命周期的回调函数中处理的，我们在构造函数中设定类这些回调函数。
当元素插入到DOM中时，`connectedCallback()`函数将会执行 — 在该函数中，我们执行`updateStyle()` 函数来确保方块按照定义来显示；
```js
connectedCallback() {
  console.log('Custom square element added to page.');
  updateStyle(this);
}
```

`disconnectedCallback()和adoptedCallback()`回调函数只是简单地将消息发送到控制台，
提示我们元素什么时候从DOM中移除、或者什么时候移动到不同的页面：
```js
disconnectedCallback() {
  console.log('Custom square element removed from page.');
}

adoptedCallback() {
  console.log('Custom square element moved to new page.');
}
```

每当元素的属性变化时，`attributeChangedCallback()`回调函数会执行。
正如它的属性所示，我们可以查看属性的名称、旧值与新值，以此来对元素属性做单独的操作。
在当前的示例中，我们只是再次执行了updateStyle()函数，以确保方块的样式在元素属性值变化后得以更新：
```js
attributeChangedCallback(name, oldValue, newValue) {
  console.log('Custom square element attributes changed.');
  updateStyle(this);
}
```

`要注意的是，如果需要在元素属性变化后，触发 attributeChangedCallback()回调函数，你必须监听这个属性。`
这可以通过定义`observedAttributes()` get函数来实现，`observedAttributes()`函数体内包含一个 return语句，
返回一个数组，包含了需要监听的属性名称：
```js
static get observedAttributes() {return ['w', 'l']; }
```





### 参考文章
- [https://developer.mozilla.org/zh-CN/docs/Web/Web_Components](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components)


