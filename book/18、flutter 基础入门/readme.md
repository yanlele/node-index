# Flutter基础入门

目录
- [常用组件](#常用组件)
    - [01.Text Widget文本组件的使用](#01.Text Widget文本组件的使用)
    - [02.Container容器组件的使用](#02.Container容器组件的使用)
    - [03.Image图片组件的使用](#03.Image图片组件的使用)
    - [04.ListView 列表组件简介](#04.ListView-列表组件简介)
    - [05.横向列表的使用](#05.横向列表的使用)
    - [06.动态列表的使用](#06.动态列表的使用)



关于环境搭建 可直接看中文网就可以了， 首先第一步， 一定要翻墙， 不翻墙一切免谈； 记得要下载JDK8， 这一点官网并没有说。。。

## 常用组件
### 01.Text Widget文本组件的使用
Text()的使用

看一下最基础的HelloWold代码。
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return MaterialApp(
      title: 'Text Widget',
      home: Scaffold(
        body: Center(
          child: Text('hello yanle'),
        ),
      ),
    );
  }
}
```

#### 01-1.TextAlign属性
TextAlign属性就是文本的对齐方式，它的属性值有如下几个                                 
- center: 文本以居中形式对齐,这个也算比较常用的了。
- left:左对齐，经常使用，让文本居左进行对齐，效果和start一样。
- right :右对齐，使用频率也不算高。
- start:以开始位置进行对齐，类似于左对齐。
- end: 以为本结尾处进行对齐，不常用。有点类似右对齐.

总结起来，也就算三个对齐方式，left(左对齐)、center（居中对齐）、right（右对齐）。我们来看一下具体代码：
```dart
body: Center(
  child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.center,
  ),
```

#### 01-2.maxLines属性
设置最多显示的行数，比如我们现在只显示1行，类似一个新闻列表的题目。代码如下：
```dart
child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.center,
    maxLines: 1,
  ),
```
设置好后，文字只能显示出1行了。

#### 01-3.overflow属性
overflow属性是用来设置文本溢出时，如何处理,它有下面几个常用的值供我们选择。              
- clip：直接切断，剩下的文字就没有了，感觉不太友好，体验性不好。
- ellipsis:在后边显示省略号，体验性较好，这个在工作中经常使用。
- fade: 溢出的部分会进行一个渐变消失的效果，当然是上线的渐变，不是左右的哦。
```dart
child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.center,
    maxLines: 1,
    overflow: TextOverflow.ellipsis,
),
```

#### 01-4.style属性
style属性的内容比较多，具体的你可以查一下API，我这里带作一个效果，方便大家快速学会Style的用法。                      
我们下面要作的效果为，字体大小为25.0,颜色为粉红色,并且有一个下划线。
```dart
body: Center(
  child: Text(
    'hello yanle 我和东方红富士康的积分大法是好饿是uavvk 熟练度附近发动机浪费扫地',
    textAlign: TextAlign.left,
    maxLines: 1,
    overflow: TextOverflow.ellipsis,
    style: TextStyle(
      fontSize: 25.0,
      color: Color.fromARGB(255, 255, 150, 150),
      decoration: TextDecoration.underline,
      decorationStyle: TextDecorationStyle.solid
    ),
  ),
)
```
其他更多的样式相关的api, 可以看这个链接[TextStyle class](https://docs.flutter.io/flutter/painting/TextStyle-class.html)

### 02.Container容器组件的使用
Container（容器控件）在Flutter是经常使用的控件，它就相当于我们HTML里的<div>标签，
每个页面或者说每个视图都离不开它。那这节课我们就来学习一下。

#### 02-1.Alignment属性
其实容器的作用就是方便我们进行布局的，Flutter这点也作的很好，我们先来看容器属性中的 **Alignment**。                            
这个属性针对的是Container内child的对齐方式，也就是容器子内容的对齐方式，并不是容器本身的对齐方式。                    
先作一个效果：建立一个容器，然后容器内加入一段文字Hello JSPang, 并让它居中对齐。                                 

这时候可以看见，我们的文本已经居中显示在手机屏幕上了。当然它的对齐方式还有如下几种：                          
```dart
body: Center(
  child: Container(
    alignment: Alignment.center,
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40
      ),
    ),
  )
)
```
- bottomCenter:下部居中对齐。
- botomLeft: 下部左对齐。
- bottomRight：下部右对齐。
- center：纵横双向居中对齐。
- centerLeft：纵向居中横向居左对齐。
- centerRight：纵向居中横向居右对齐。
- topLeft：顶部左侧对齐。
- topCenter：顶部居中对齐。
- topRight： 顶部居左对齐。

#### 02-2.设置宽、高和颜色属性
设置宽、高和颜色属性是相对容易的，只要在属性名称后面加入浮点型数字就可以了，比如要设置宽是500，高是400，颜色为亮蓝色。
```dart
body: Center(
  child: Container(
    alignment: Alignment.center,
    width: 500,
    height: 400,
    color: Colors.lightBlue,
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40,
        color: Colors.white
      ),
    ),
  )
)
```

---------------------

上节已经简单的学习了一下Container容器组件的用法，这节我们继续学习，主要讲解一下的**padding,margin和decoration**这几个属性。我们先来看看Padding属性。

#### 02-3.padding属性
padding的属性就是一个内边距，它和你使用的前端技术CSS里的padding表现形式一样，
指的是Container边缘和child内容的距离。先来看一个内边距为10的例子。
```dart
child: Container(
    alignment: Alignment.center,
    width: 500,
    height: 400,
    color: Colors.lightBlue,
    padding: const EdgeInsets.all(10),
    child: Text(
        'hello yanle',
        style: TextStyle(
        fontSize: 40,
        color: Colors.white
        ),
    ),
)
```
上面主要的padding代码就一句。                              

`padding:const EdgeInsets.all(10.0),` 这句的意思是设置Container的内边距是10，左右上下全部为10，这看起来非常容易。
那我们再加大一点难度。如果上边距为30，左边距为10，这时候EdgeInsets.all()就满足不了我们了。

**`EdgeInsets.fromLTRB(value1,value2,value3,value4)`**：                         
我们用EdgeInsets.fromLTRB(value1,value2,value3,value4) 可以满足我们的需求，LTRB分别代表左、上、右、下。

那我们设置上边距为30，左边距为10，就可以用下面的代码来编写。
```dart
child: Container(
    alignment: Alignment.topLeft,
    width: 500,
    height: 400,
    color: Colors.lightBlue,
    padding: const EdgeInsets.fromLTRB(10, 30, 0, 0),
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40,
        color: Colors.white
      ),
    ),
  )
```

#### 02-4.margin属性
会了padding属性的设置，margin就变的非常容易了，因为方法基本上一样。不过margin是外边距，只的是container和外部元素的距离。                      
现在要把container的外边距设置为10个单位，代码如下
```dart
child: Container(
    alignment: Alignment.topLeft,
    width: 500,
    height: 400,
    color: Colors.lightBlue,
    padding: const EdgeInsets.fromLTRB(10, 30, 0, 0),
    margin: const EdgeInsets.all(10),
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40,
        color: Colors.white
      ),
    ),
  )
```
当然你也可以分别设置不同的外边距，方法也是使用fromLTRB，这里就不累述了。

#### 02-05.decoration属性
decoration是 container 的修饰器，主要的功能是设置背景和边框。
比如你需要给背景加入一个渐变，这时候需要使用BoxDecoration这个类，代码如下
（需要注意的是如果你设置了decoration，就不要再设置color属性了，因为这样会冲突）。
```dart
child: Container(
    alignment: Alignment.topLeft,
    width: 500,
    height: 400,
    padding: const EdgeInsets.fromLTRB(10, 30, 0, 0),
    margin: const EdgeInsets.all(10),
    decoration: new BoxDecoration(
      gradient: const LinearGradient(
          colors: [Colors.lightBlue, Colors.greenAccent, Colors.purple]
      )
    ),
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40,
        color: Colors.white
      ),
    ),
  )
```
上面的代码去掉了color的设置

**渐变**： `gradient`                              
```dart
  gradient: const LinearGradient(
      colors: [Colors.lightBlue, Colors.greenAccent, Colors.purple]
  )
```

**设置边框**: `border`                        
设置边框可以在decoration里设置`border`属性，比如你现在要设置一个红色边框，宽度为2。
```dart
child: Container(
    alignment: Alignment.topLeft,
    width: 500,
    height: 400,
    padding: const EdgeInsets.fromLTRB(10, 30, 0, 0),
    margin: const EdgeInsets.all(10),
    decoration: new BoxDecoration(
      gradient: const LinearGradient(
          colors: [Colors.lightBlue, Colors.greenAccent, Colors.purple]
      ),
      border: Border.all(
        width: 2,
        color: Colors.red,
      )
    ),
    child: Text(
      'hello yanle',
      style: TextStyle(
        fontSize: 40,
        color: Colors.white
      ),
    ),
  )
```
关键代码： `border: Border.all(width, color)`

完整代码示例：
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Text Widget',
      home: Scaffold(
          body: Center(
              child: Container(
                alignment: Alignment.topLeft,
                width: 500,
                height: 400,
                padding: const EdgeInsets.fromLTRB(10, 30, 0, 0),
                margin: const EdgeInsets.all(10),
                decoration: new BoxDecoration(
                    gradient: const LinearGradient(
                        colors: [Colors.lightBlue, Colors.greenAccent, Colors.purple]),
                    border: Border.all(
                      width: 2,
                      color: Colors.red,
                    )),
                child: Text(
                  'hello yanle',
                  style: TextStyle(fontSize: 40, color: Colors.white),
                ),
              ))),
    );
  }
}
```


### 03.Image图片组件的使用

#### 03-1.加入图片的几种方式
- Image.asset:加载资源图片，就是加载项目资源目录中的图片,加入图片后会增大打包的包体体积，用的是相对路径。
- Image.network:网络资源图片，意思就是你需要加入一段http://xxxx.xxx的这样的网络路径地址。
- Image.file:加载本地图片，就是加载本地文件中的图片，这个是一个绝对路径，跟包体无关。
- Image.memory: 加载Uint8List资源图片,这个我目前用的不是很多，所以没什么发言权。

来一个添加网络图片的例子， Container 中添加一个图片：
```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Text widget',
      home: Scaffold(
        body: Center(
          child: Container(
            child: new Image.network(
              'https://avatars3.githubusercontent.com/u/22188674?s=460&v=4',
              scale: 1,
            ),
            width: 300,
            height: 300,
            decoration: new BoxDecoration(
              border: Border.all(
                width: 3,
                color: Colors.lightBlue,
              )
            ),
          ),
        )
      ),
    );
  }
}
```
这时候就可以看到图片被加入进来了，当然我们还顺便设置了容器的宽和高。                              


#### 03-2.fit属性的设置
**这个地方有点儿疑问， 需要看看视频资料再说**

fit属性可以控制图片的拉伸和挤压，这些都是根据图片的父级容器来的，我们先来看看这些属性
- BoxFit.fill:全图显示，图片会被拉伸，并充满父容器。
- BoxFit.contain:全图显示，显示原比例，可能会有空隙。
- BoxFit.cover：显示可能拉伸，可能裁切，充满（图片要充满整个容器，还不变形）。
- BoxFit.fitWidth：宽度充满（横向充满），显示可能拉伸，可能裁切。
- BoxFit.fitHeight ：高度充满（竖向充满）,显示可能拉伸，可能裁切。
- BoxFit.scaleDown：效果和contain差不多，但是此属性不允许显示超过源图片大小，可小不可大。


#### 03-3.图片的混合模式
图片混合模式（colorBlendMode）和color属性配合使用，能让图片改变颜色，里边的模式非常的多，产生的效果也是非常丰富的。在这里作几个简单的例子
```dart
home: Scaffold(
      body: Center(
    child: Container(
      alignment: Alignment.center,
      width: 300,
      height: 300,
      decoration: new BoxDecoration(
          border: Border.all(
        width: 3,
        color: Colors.lightBlue,
      )),
      child: new Image.network(
        'https://avatars3.githubusercontent.com/u/22188674?s=460&v=4',
        color: Colors.greenAccent,
        colorBlendMode: BlendMode.colorBurn,
      ),
    ),
  )),
```
核心代码：
```dart
child: new Image.network(
    'https://avatars3.githubusercontent.com/u/22188674?s=460&v=4',
    color: Colors.greenAccent,
    colorBlendMode: BlendMode.colorBurn,
  ),
```
- color：是要混合的颜色，如果你只设置color是没有意义的。
- colorBlendMode:是混合模式，相当于我们如何混合。


#### 03-4.repeat图片重复
- ImageRepeat.repeat : 横向和纵向都进行重复，直到铺满整个画布。
- ImageRepeat.repeatX: 横向重复，纵向不重复。
- ImageRepeat.repeatY：纵向重复，横向不重复。



### 04.ListView 列表组件简介
列表组件的知识其实是很多的，也是一个经常使用的组件，我们这里先作一个简介，让大家有个直观的感受，先敲开大门，大家就好深入了。

#### 04-1.ListView的声明
主要练习的代码如下
```dart
import 'package:flutter/material.dart';

void main() {
  return runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'yanle flutter',
      home: Scaffold(
        appBar: new AppBar(
          title: Text('ListView Widget'),
        ),
        body: Center(
          child: Text('ListView Text'),
        ),
      ),
    );
  }
}
```

有了最基本的结构后，就可以加入ListView组件，在body代码处加入下面的代码：                      
```dart
body: new ListView(
  children: <Widget>[
    new ListTile(
      leading: new Icon(Icons.access_time),
      title: Text('access_time'),
    )
  ],
),
```

我们使用了ListView，然后在他的内部children中，使用了widget数组，因为是一个列表，所以它接受一个数组，然后有使用了listTite组件（列表瓦片），在组件中放置了图标和文字。                       
当然我们还可以多加入几行列表，比如我们再加入一行，代码如下。
```dart
body: new ListView(
  children: <Widget>[
    new ListTile(
      leading: new Icon(Icons.access_time),
      title: Text('access_time'),
    ),
    new ListTile(
      leading: new Icon(Icons.account_balance),
      title: new Text('account_balance')
    )
  ],
),
```
这个时候已经有两行列表了。 

#### 04-2.图片列表的使用
在这里我们就在列表中加入图片来试一下。我们插入4幅图片，然后看一下效果，代码如下：
```dart
body: new ListView(
  children:<Widget>[
    new Image.network(
        'http://jspang.com/static/upload/20181111/G-wj-ZQuocWlYOHM6MT2Hbh5.jpg'
    ),
    new Image.network(
        'http://jspang.com/static/upload/20181109/1bHNoNGpZjyriCNcvqdKo3s6.jpg'
    ),
    new Image.network(
        'http://jspang.com/static/myimg/typescript_banner.jpg'
    ),new Image.network(
        'http://jspang.com/static/myimg/smile-vue.jpg'
    )
  ]
),
```
我们使用了网络的方式，插入了4张图片，并且这4张图片形成了一个列表。



### 05.横向列表的使用
已经对ListView有了清楚的认识，也做出了普通的纵向（竖向列表）。 
其实还是使用我们的ListView组件，只是在ListView组件里加一个**ScrollDirection**属性。

#### 05-1.制作横向列表
这个我们先来看效果，然后再具体讲解使用方法
```dart
import 'package:flutter/material.dart';

void main() {
  return runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'yanle flutter',
      home: Scaffold(
        appBar: new AppBar(
          title: Text('ListView Widget'),
        ),
        body: Center(
          child: Container(
            height: 200,
            child: new ListView(
              scrollDirection: Axis.horizontal,
              children: <Widget>[
                new Container(
                  width: 180,
                  color: Colors.lightBlue,
                ),
                new Container(
                  width: 180,
                  color: Colors.amber,
                ),
                new Container(
                  width: 180,
                  color: Colors.deepOrange,
                ),
                new Container(
                  width: 180,
                  color: Colors.deepPurpleAccent,
                )
              ],
            ),
          ),
        )
      ),
    );
  }
}
```
我们先是加入了Center组件，作用是让我们的横向列表可以居中到屏幕的中间位置，
然后在center组件的下面加入了Container容器组件，并设置了容器组件的高是200，
在容器组件里我们加入了ListView组件，然后设置了组件的scrollDirection属性。
然后再ListView的子组件里加入了Container容器组件，然后设置了不同颜色.


#### 05-2.scrollDirection属性
`scrollDirection: Axis.horizontal`:                             
ListView组件的scrollDirection属性只有两个值，一个是横向滚动，一个是纵向滚动。
默认的就是垂直滚动，所以如果是垂直滚动，我们一般都不进行设置。                         
- Axis.horizontal:横向滚动或者叫水平方向滚动。
- Axis.vertical:纵向滚动或者叫垂直方向滚动。


#### 05-3.优化代码简介
学到这里，我相信很多小伙伴一定心里很多草泥马在崩腾了，Flutter太反人类了，全是嵌套，让我们如何维护。
其实这不能怪Flutter，这是我为了教学简单，所以没有把组件分开定义。                       
现在把列表组件独立定义成一个类，然后我们再加入到主组件中。
再工作中会把组件分的很细，这样既能很好的复用有便于维护，还有利于分工，我个人是非常喜欢Flutter这种万物皆组件的形式的。                              
我们声明一个MyList的类，然后把嵌套的代码放到这个类里,代码如下。                             
```dart
import 'package:flutter/material.dart';

class MyList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      scrollDirection: Axis.horizontal,
      children: <Widget>[
        new Container(
          width: 180,
          color: Colors.lightBlue,
        ),
        new Container(
          width: 180,
          color: Colors.amber,
        ),
        new Container(
          width: 180,
          color: Colors.deepOrange,
        ),
        new Container(
          width: 180,
          color: Colors.deepPurpleAccent,
        )
      ],
    );
  }
}
```

然后再MyAPP类里直接使用这个类，这样就减少了嵌套:  main.dart
```dart
import 'package:flutter/material.dart';
import 'package:flutter_app/MyList.dart';

void main() {
  return runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'yanle flutter',
      home: Scaffold(
        appBar: new AppBar(
          title: Text('ListView Widget121'),
        ),
        body: Center(
          child: Container(
            height: 200,
            child: MyList(),
          ),
        )
      ),
    );
  }
}
```


### 06.动态列表的使用












## 参考文章
- [Flutter中文网](https://flutterchina.club)
- [JSpang Flutter系列教程和文章](https://jspang.com)

