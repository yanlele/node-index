# DOM 和 BOM

目录              
- [DOM部分](#dom)             
    - [document对象](#dom-class01)                
    - [html dom对象](#dom-class02)
    - [DOM 属性 对象](#dom-class03)


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
[document.createComment()](./dom/01、document对象/05、createComment.html)|	createComment() 方法可创建注释节点。
document.createDocumentFragment()|	创建空的 DocumentFragment 对象，并返回此对象。
[document.createElement()](./dom/01、document对象/06、createElement.html)|	创建元素节点。
[document.createTextNode()](./dom/01、document对象/07、createTextNode.html)|	创建文本节点。
document.doctype|	返回与文档相关的文档类型声明 (DTD)。
[document.documentElement](./dom/01、document对象/08、documentElement.html)|	返回文档的根节点，感觉并不重要
document.documentMode|	返回用于通过浏览器渲染文档的模式, documentMode 是 IE 浏览器特定属性，在IE8及之后的IE版本都支持该属性。
[document.documentURI](./dom/01、document对象/09、document.documentURI.html)|	设置或返回文档的位置
document.domain|	返回当前文档的域名。
document.embeds|	返回文档中所有嵌入的内容（embed）集合
document.forms|	返回对文档中所有 Form 对象引用。
**document.getElementsByClassName()**|	返回文档中所有指定类名的元素集合，作为 NodeList 对象。
**document.getElementById()**|	返回对拥有指定 id 的第一个对象的引用。
**document.getElementsByName()**|	返回带有指定名称的对象集合。
**document.getElementsByTagName()**|	返回带有指定标签名的对象集合。
document.images|	返回对文档中所有 Image 对象引用。
document.implementation|	返回处理该文档的 DOMImplementation 对象。
document.importNode()|	把一个节点从另一个文档复制到该文档以便应用。
document.inputEncoding|	返回用于文档的编码方式（在解析时）。
document.lastModified|	返回文档被最后修改的日期和时间。
document.links|	返回对文档中所有 Area 和 Link 对象引用。
document.normalize()|	删除空文本节点，并连接相邻节点
~~document.normalizeDocument()~~|	删除空文本节点，并连接相邻节点的, 主流浏览器不支持
**document.querySelector()**|	返回文档中匹配指定的CSS选择器的第一元素
**document.querySelectorAll()**|	document.querySelectorAll() 是 HTML5中引入的新方法，返回文档中匹配的CSS选择器的所有元素节点列表
[document.readyState](http://www.runoob.com/jsref/prop-doc-readystate.html)|	返回文档状态 (载入中……)
document.referrer|	返回载入当前文档的文档的 URL。
**document.removeEventListener()**|	移除文档中的事件句柄(由 addEventListener() 方法添加)
~~document.renameNode()~~|	重命名元素或者属性节点。
[document.scripts](http://www.runoob.com/jsref/coll-doc-scripts.html)|	返回页面中所有脚本的集合。
document.strictErrorChecking|	设置或返回是否强制进行错误检查。
**document.title**|	返回当前文档的标题。
[document.URL](http://www.runoob.com/jsref/prop-doc-url.html)|	返回文档完整的URL
[document.write()](http://www.runoob.com/jsref/met-doc-write.html)|	向文档写 HTML 表达式 或 JavaScript 代码。
[document.writeln()](http://www.runoob.com/jsref/met-doc-writeln.html)|	等同于 write() 方法，不同的是在每个表达式之后写一个换行符。


### <p id='dom-class02'>2、HTML DOM 元素对象</p>
|属性 / 方法|描述|                                    
|:-|:-|            
element.accessKey|	设置或返回accesskey一个元素
[element.addEventListener()](./dom/02、html_dom元素对象/01、addEventListener.html)|	向指定元素添加事件句柄
[element.appendChild()](./dom/02、html_dom元素对象/02、appendChild.html)|	为元素添加一个新的子元素
**element.attributes**	|返回一个元素的属性数组
element.childNodes|	返回元素的一个子节点的数组
element.classList	|返回元素的类名，作为 DOMTokenList 对象。
**element.className**|	设置或返回元素的class属性
**element.clientHeight**|	在页面上返回内容的可视高度（不包括边框，边距或滚动条）
**element.clientWidth**|	在页面上返回内容的可视宽度（不包括边框，边距或滚动条）
**element.cloneNode()**|	克隆某个元素
element.compareDocumentPosition()|	比较两个元素的文档位置。
element.contentEditable|	设置或返回元素的内容是否可编辑
element.dir|	设置或返回一个元素中的文本方向
**element.firstChild**|	返回元素的第一个子节点
**element.focus()**|	设置文档或元素获取焦点
**element.getAttribute()**|	返回指定元素的属性值
**element.getAttributeNode()**|	返回指定属性节点
**element.getElementsByTagName()**|	返回指定标签名的所有子元素集合。
**element. getElementsByClassName()**|	返回文档中所有指定类名的元素集合，作为 NodeList 对象。
element.getFeature()|	返回指定特征的执行APIs对象。
element.getUserData()|	返回一个元素中关联键值的对象。
**element.hasAttribute()**|	如果元素中存在指定的属性返回 true，否则返回false。
**element.hasAttributes()**|	如果元素有任何属性返回true，否则返回false。
**element.hasChildNodes()**|	返回一个元素是否具有任何子元素
**element.hasFocus()**|	返回布尔值，检测文档或元素是否获取焦点
**element.id**|	设置或者返回元素的 id。
**element.innerHTML**|	设置或者返回元素的内容。
**element.insertBefore()**|	现有的子元素之前插入一个新的子元素
element.isContentEditable|	如果元素内容可编辑返回 true，否则返回false
element.isDefaultNamespace()|	如果指定了namespaceURI 返回 true，否则返回 false。
element.isEqualNode()|	检查两个元素是否相等
element.isSameNode()|	检查两个元素所有有相同节点。
element.isSupported()|	如果在元素中支持指定特征返回 true。
element.lang|	设置或者返回一个元素的语言。
**element.lastChild**|	返回的最后一个子元素
element.namespaceURI|	返回命名空间的 URI。
element.nextSibling|	返回该元素紧跟的一个节点
element.nodeName|	返回元素的标记名（大写）
element.nodeType|	返回元素的节点类型
**element.nodeValue**|	返回元素的节点值
element.normalize()|	使得此成为一个"normal"的形式，其中只有结构（如元素，注释，处理指令，CDATA节和实体引用）隔开Text节点，即元素（包括属性）下面的所有文本节点，既没有相邻的文本节点也没有空的文本节点
**element.offsetHeight**|	返回，任何一个元素的高度包括边框和填充，但不是边距
**element.offsetWidth**|	返回元素的宽度，包括边框和填充，但不是边距
**element.offsetLeft**|	返回当前元素的相对水平偏移位置的偏移容器
**element.offsetParent**|	返回元素的偏移容器
**element.offsetTop**|	返回当前元素的相对垂直偏移位置的偏移容器
element.ownerDocument|	返回元素的根元素（文档对象）
**element.parentNode**|	返回元素的父节点
**element.previousSibling**|	返回某个元素紧接之前元素
**element.querySelector()**|	返回匹配指定 CSS 选择器元素的第一个子元素
**document.querySelectorAll()**|	返回匹配指定 CSS 选择器元素的所有子元素节点列表
**element.removeAttribute()**|	从元素中删除指定的属性
**element.removeAttributeNode()**|	删除指定属性节点并返回移除后的节点。
**element.removeChild()**|	删除一个子元素
**element.removeEventListener()**|	移除由 addEventListener() 方法添加的事件句柄
**element.replaceChild()**|	替换一个子元素
element.scrollHeight|	返回整个元素的高度（包括带滚动条的隐蔽的地方）
element.scrollLeft|	返回当前视图中的实际元素的左边缘和左边缘之间的距离
element.scrollTop|	返回当前视图中的实际元素的顶部边缘和顶部边缘之间的距离
element.scrollWidth|	返回元素的整个宽度（包括带滚动条的隐蔽的地方）
**element.setAttribute()**|	设置或者改变指定属性并指定值。
**element.setAttributeNode()**|	设置或者改变指定属性节点。
element.setIdAttribute()|	
element.setIdAttributeNode()|	
element.setUserData()|	在元素中为指定键值关联对象。
**element.style**|	设置或返回元素的样式属性
element.tabIndex|	设置或返回元素的标签顺序。
element.tagName|	作为一个字符串返回某个元素的标记名（大写）
element.textContent|	设置或返回一个节点和它的文本内容
element.title|	设置或返回元素的title属性
element.toString()|	一个元素转换成字符串
nodelist.item()|	返回某个元素基于文档树的索引
nodelist.length|	返回节点列表的节点数目。


### <p id='dom-class03'>03、DOM 属性 对象</p>                
|属性 / 方法|描述|                                    
|:-|:-|   
attr.isId|	如果属性是 ID 类型，则 isId 属性返回 true，否则返回 false。
attr.name|	返回属性名称
attr.value|	设置或者返回属性值
attr.specified|	如果属性被指定返回 true ，否则返回 false
[nodemap.getNamedItem()](./dom/03、dom属性对象/01、getNamedItem.html)|	从节点列表中返回的指定属性节点。
[nodemap.item()](./dom/03、dom属性对象/02、item.html)|	返回节点列表中处于指定索引号的节点。
nodemap.length|	返回节点列表的节点数目。
**nodemap.removeNamedItem()**|	删除指定属性节点
[nodemap.setNamedItem()](./dom/03、dom属性对象/03、setNamedItem.html)|	设置指定属性节点(通过名称)



### <p id='dom-class04'>04、HTML DOM 事件</p>              

#### 鼠标事件
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|   
onclick	|当用户点击某个对象时调用的事件句柄。|	2
oncontextmenu|	在用户点击鼠标右键打开上下文菜单时触发	| 
ondblclick|	当用户双击某个对象时调用的事件句柄。|	2
onmousedown|	鼠标按钮被按下。|	2
onmouseenter|	当鼠标指针移动到元素上时触发。|	2
onmouseleave|	当鼠标指针移出元素时触发|	2
onmousemove|	鼠标被移动。|	2
onmouseover|	鼠标移到某元素之上。|	2
onmouseout|	鼠标从某元素移开。|	2
onmouseup|	鼠标按键被松开。|	2

#### 键盘事件
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|   
onkeydown	|某个键盘按键被按下。|	2
onkeypress	|某个键盘按键被按下并松开。|	2
onkeyup	|某个键盘按键被松开。	|2


#### 框架/对象（Frame/Object）事件          
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|          
onabort	|图像的加载被中断。| ( <object>)	2
onbeforeunload	|该事件在即将离开页面（刷新或关闭）时触发|	2
onerror	|在加载文档或图像时发生错误。 ( <object>, <body>和 <frameset>)|	 
onhashchange	|该事件在当前 URL 的锚部分发生修改时触发。|	 
onload	|一张页面或一幅图像完成加载。|	2
onpageshow	|该事件在用户访问页面时触发	|
onpagehide	|该事件在用户离开当前网页跳转到另外一个页面时触发	|
onresize	|窗口或框架被重新调整大小。|	2
onscroll	|当文档被滚动时发生的事件。|	2
onunload	|用户退出页面。 ( <body> 和 <frameset>)|	2


#### 表单事件                   
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|   
onblur|	元素失去焦点时触发|	2
onchange|	该事件在表单元素的内容改变时触发( <input>, <keygen>, <select>, 和 <textarea>)|	2
onfocus|	元素获取焦点时触发|	2
onfocusin|	元素即将获取焦点时触发|	2
onfocusout|	元素即将失去焦点时触发|	2
oninput|	元素获取用户输入时触发|	3
onreset|	表单重置时触发|	2
onsearch|	用户向搜索域输入文本时触发 ( <input="search">)|	 
onselect|	用户选取文本时触发 ( <input> 和 <textarea>)|	2
onsubmit|	表单提交时触发|	2


#### 剪贴板事件              
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|   
oncopy	|该事件在用户拷贝元素内容时触发	 |
oncut	|该事件在用户剪切元素内容时触发	 |
onpaste	|该事件在用户粘贴元素内容时触发  |


#### 打印事件           
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|              
onafterprint	|该事件在页面已经开始打印，或者打印窗口已经关闭时触发	| 
onbeforeprint	|该事件在页面即将开始打印时触发	 |


#### 拖动事件               
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|          
ondrag	|该事件在元素正在拖动时触发|	 
ondragend	|该事件在用户完成元素的拖动时触发|	 
ondragenter	|该事件在拖动的元素进入放置目标时触发	 |
ondragleave	|该事件在拖动元素离开放置目标时触发	| 
ondragover	|该事件在拖动元素在放置目标上时触发	| 
ondragstart	|该事件在用户开始拖动元素时触发	 |
ondrop	|该事件在拖动元素放置在目标区域时触发	 |



#### 多媒体（Media）事件
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|                  
onabort	|事件在视频/音频（audio/video）终止加载时触发。	 |
oncanplay	|事件在用户可以开始播放视频/音频（audio/video）时触发。	 |
oncanplaythrough	|事件在视频/音频（audio/video）可以正常播放且无需停顿和缓冲时触发。	 |
ondurationchange	|事件在视频/音频（audio/video）的时长发生变化时触发。	 |
onemptied	|当期播放列表为空时触发	 |
onended	|事件在视频/音频（audio/video）播放结束时触发。	 |
onerror	|事件在视频/音频（audio/video）数据加载期间发生错误时触发。	 |
onloadeddata	|事件在浏览器加载视频/音频（audio/video）当前帧时触发触发。	 |
onloadedmetadata	|事件在指定视频/音频（audio/video）的元数据加载后触发。	 |
onloadstart	|事件在浏览器开始寻找指定视频/音频（audio/video）触发。	 |
onpause	|事件在视频/音频（audio/video）暂停时触发。	 |
onplay	|事件在视频/音频（audio/video）开始播放时触发。	 |
onplaying	|事件在视频/音频（audio/video）暂停或者在缓冲后准备重新开始播放时触发。	 |
onprogress	|事件在浏览器下载指定的视频/音频（audio/video）时触发。	 |
onratechange	|事件在视频/音频（audio/video）的播放速度发送改变时触发。	 |
onseeked	|事件在用户重新定位视频/音频（audio/video）的播放位置后触发。	 |
onseeking	|事件在用户开始重新定位视频/音频（audio/video）时触发。	 |
onstalled	|事件在浏览器获取媒体数据，但媒体数据不可用时触发。	 |
onsuspend	|事件在浏览器读取媒体数据中止时触发。	 |
ontimeupdate	|事件在当前的播放位置发送改变时触发。	 |
onvolumechange	|事件在音量发生改变时触发。	 |
onwaiting	|事件在视频由于要播放下一帧而需要缓冲时触发。	 |


#### 动画事件               
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|                  
animationend	|该事件在 CSS 动画结束播放时触发	 |
animationiteration	|该事件在 CSS 动画重复播放时触发	 |
animationstart	|该事件在 CSS 动画开始播放时触发	 |


#### 过渡事件           
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|                  
transitionend|	该事件在 CSS 完成过渡后触发。|	 


#### 其他事件           
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|              
onmessage	|该事件通过或者从对象(WebSocket, Web Worker, Event Source 或者子 frame 或父窗口)接收到消息时触发	 |
onmousewheel	|已废弃。 使用 onwheel 事件替代	 |
ononline	|该事件在浏览器开始在线工作时触发。	 |
onoffline	|该事件在浏览器开始离线工作时触发。	 |
onpopstate	|该事件在窗口的浏览历史（history 对象）发生改变时触发。	 |
onshow	|该事件当 <menu> 元素在上下文菜单显示时触发	 |
onstorage	|该事件在 Web Storage(HTML 5 Web 存储)更新时触发	 |
ontoggle	|该事件在用户打开或关闭 <details> 元素时触发	 |
onwheel	|该事件在鼠标滚轮在元素上下滚动时触发	 |


#### 事件对象
**常量**              
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|              
CAPTURING-PHASE	当前事件阶段为捕获阶段(1)	1
AT-TARGET	当前事件是目标阶段,在评估目标事件(1)	2
BUBBLING-PHASE	当前的事件为冒泡阶段 (3)	3


**属性**          
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|              
bubbles	|返回布尔值，指示事件是否是起泡事件类型。|	2
cancelable	|返回布尔值，指示事件是否可拥可取消的默认动作。|	2
currentTarget	|返回其事件监听器触发该事件的元素。|	2
eventPhase	|返回事件传播的当前阶段。|	2
target	|返回触发此事件的元素（事件的目标节点）。|	2
timeStamp	|返回事件生成的日期和时间。|	2
type	|返回当前 Event 对象表示的事件的名称。|	2


**方法**              
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|              
initEvent()	|初始化新创建的 Event 对象的属性。	|2
preventDefault()	|通知浏览器不要执行与事件关联的默认动作。|	2
stopPropagation()	|不再派发事件。|	2


#### 目标事件对象         
**方法**          
|属性 / 方法|描述|DOM类型|                                    
|:-|:-|:-|              
addEventListener()	|允许在目标事件中注册监听事件(IE8 = attachEvent())	|2
dispatchEvent()	|允许发送事件到监听器上 (IE8 = fireEvent())|	2
removeEventListener()	|运行一次注册在事件目标上的监听事件(IE8 = detachEvent())	|2


#### 