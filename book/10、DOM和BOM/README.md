# DOM 和 BOM

目录              
- [DOM部分](#dom)             
    - [document对象](#dom-class01)                


## <p id='dom'>DOM 部分</p>

### <p id='dom-class01'>document对象</p>                  
Document 对象常用的属性和方法            

|属性 / 方法|描述|                                    
|:-|:-|             
|document.activeElement	|返回当前获取焦点元素|                    
|document.addEventListener()|向文档添加句柄|               	
|[document.anchors](./dom/01、document对象/01、anchors.html)|返回对文档中所有 Anchor 对象的引用。anchors集合返回了当前页面的所有超级链接数组 。不过需要注意的是，只有当a标签添加了name以后才能拿现实统计到|                               
|[document.baseURI](./dom/01、document对象/02、baseURI.html)	|返回文档的绝对基础 URI|
document.body|	返回文档的body元素
[document.open()](./dom/01、document对象/03、open和close.html)|	打开一个流，以收集来自任何 document.write() 或 document.writeln() 方法的输出。
[document.close()](./dom/01、document对象/03、open和close.html)|	关闭用 document.open() 方法打开的输出流，并显示选定的数据。
document.cookie|	设置或返回与当前文档有关的所有 cookie。
[document.createAttribute()](./dom/01、document对象/04、createAttribute.html)|	创建一个属性节点
document.createComment()|	createComment() 方法可创建注释节点。
document.createDocumentFragment()|	创建空的 DocumentFragment 对象，并返回此对象。
document.createElement()|	创建元素节点。
document.createTextNode()|	创建文本节点。
document.doctype|	返回与文档相关的文档类型声明 (DTD)。
document.documentElement|	返回文档的根节点
document.documentMode|	返回用于通过浏览器渲染文档的模式
document.documentURI|	设置或返回文档的位置
document.domain|	返回当前文档的域名。
document.embeds|	返回文档中所有嵌入的内容（embed）集合
document.forms|	返回对文档中所有 Form 对象引用。
document.getElementsByClassName()|	返回文档中所有指定类名的元素集合，作为 NodeList 对象。
document.getElementById()|	返回对拥有指定 id 的第一个对象的引用。
document.getElementsByName()|	返回带有指定名称的对象集合。
document.getElementsByTagName()|	返回带有指定标签名的对象集合。
document.images|	返回对文档中所有 Image 对象引用。
document.implementation|	返回处理该文档的 DOMImplementation 对象。
document.importNode()|	把一个节点从另一个文档复制到该文档以便应用。
document.inputEncoding|	返回用于文档的编码方式（在解析时）。
document.lastModified|	返回文档被最后修改的日期和时间。
document.links|	返回对文档中所有 Area 和 Link 对象引用。
document.normalize()|	删除空文本节点，并连接相邻节点
document.normalizeDocument()|	删除空文本节点，并连接相邻节点的
document.querySelector()|	返回文档中匹配指定的CSS选择器的第一元素
document.querySelectorAll()|	document.querySelectorAll() 是 HTML5中引入的新方法，返回文档中匹配的CSS选择器的所有元素节点列表
document.readyState|	返回文档状态 (载入中……)
document.referrer|	返回载入当前文档的文档的 URL。
document.removeEventListener()|	移除文档中的事件句柄(由 addEventListener() 方法添加)
document.renameNode()|	重命名元素或者属性节点。
document.scripts|	返回页面中所有脚本的集合。
document.strictErrorChecking|	设置或返回是否强制进行错误检查。
document.title|	返回当前文档的标题。
document.URL|	返回文档完整的URL
document.write()|	向文档写 HTML 表达式 或 JavaScript 代码。
document.writeln()|	等同于 write() 方法，不同的是在每个表达式之后写一个换行符。
