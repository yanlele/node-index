## 05、web-component-mdn

Web Components旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

- Custom elements（自定义元素）：一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。
- Shadow DOM（影子DOM）：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- HTML templates（HTML模板）： <template> 和 <slot> 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。


### 使用 custom elements
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


