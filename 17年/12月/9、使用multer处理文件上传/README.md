# 使用multer处理文件上传的问题

>  完美实例请见本实例项目

>  基本使用
- 后端
    - 在router里面做如下配置
    ```javascript
    const multer = require('multer');
    const result = require('../util/result');
    
    let storage = multer.diskStorage({
        //设置上传后文件路径，uploads文件夹会自动创建。
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        //给上传文件重命名，获取添加后缀名
        filename: function (req, file, cb) {
            let fileFormat = (file.originalname).split(".");
            let filename = file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]
            cb(null, filename);
        }
    });
    let upload = multer({
        storage: storage
    });
    ```
    - 在对应路由controller做如下使用：
    ```javascript
    //提交数据
    //这个地方的upload.single('XXXX'),XXX是对应的前端input框，上传文件的name
    router.post('/', upload.single('avatar'), (req, res) => {
        console.log(req.file);
    
        //如果文件上传成功，获取文件的名字存入数据库
        if (req.file) {
            let file=req.file;
            let fileFormat = (file.originalname).split(".");
            let filename = file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1];
            console.log(filename);
    
            res.status(200).json(result(0,'上传文件成功'),{
                filename:filename
            })
        }
    });
    ```
- 前端
```html
<form method="post" enctype="multipart/form-data">
    <input type="file" name="avatar" value="选择你上传的文件">
    <input type="submit">
</form>
```

> 基础语法

- Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息。

- 基本使用方法:
```javascript
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files 是 `photos` 文件数组的信息
    // req.body 将具有文本域数据，如果存在的话
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
    // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
    //
    // 例如：
    //  req.files['avatar'][0] -> File
    //  req.files['gallery'] -> Array
    //
    // req.body 将具有文本域数据，如果存在的话
})
```

-  如果你需要处理一个只有文本域的表单，你可以使用任何一个 multer 方法 (.single(), .array(), fields()). 下面是一个使用 .array() 的例子:
```javascript
var express = require('express')
var app = express()
var multer  = require('multer')
var upload = multer()

app.post('/profile', upload.array(), function (req, res, next) {
    // req.body 包含文本域
})
```

- multer(opts)      
    Multer 接受一个 options 对象，其中最基本的是 dest 属性，这将告诉 Multer 将上传文件保存在哪。如果你省略 options 对象，这些文件将保存在内存中，永远不会写入磁盘。     
    为了避免命名冲突，Multer 会修改上传的文件名。这个重命名功能可以根据您的需要定制。        
    以下是可以传递给 Multer 的选项。 

- 20.1、storage

- 20.1.1、DiskStorage        
磁盘存储引擎可以让你控制文件的存储。      
```javascript
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })
```

    有两个选项可用，destination 和 filename。他们都是用来确定文件存储位置的函数。       
    destination 是用来确定上传的文件应该存储在哪个文件夹中。也可以提供一个 string (例如 '/tmp/uploads')。如果没有设置 destination，则使用操作默认的临时文件夹       
    注意: 如果你提供的 destination 是一个函数，你需要负责创建文件夹。当提供一个字符串，multer 将确保这个文件夹是你创建的。      
    filename 用于确定文件夹中的文件名的确定。 如果没有设置 filename，每个文件将设置为一个随机文件名，并且是没有扩展名的     
    注意: Multer 不会为你添加任何扩展名，你的程序应该返回一个完整的文件名。        
    每个函数都传递了两个请求 (req) 和一些关于这个文件的信息 (file) 有助于你的决定。     
    注意 req.body 可能还没有完全填充，这取决于向客户端发送字段和文件到服务器的顺序。       

- 20.1.2、MemoryStorage
    内存存储引擎将文件存储在内存中的 Buffer 对象，它没有任何选项      
    var storage = multer.memoryStorage()var upload = multer({ storage: storage })       
    当使用内存存储引擎，文件信息将包含一个 buffer 字段，里面包含了整个文件数据。      
    警告: 当你使用内存存储，上传非常大的文件，或者非常多的小文件，会导致你的应用程序内存溢出       

- 20.2、limits
    一个对象，指定一些数据大小的限制。Multer 通过这个对象使用 busboy，详细的特性可以在 busboy's page 找到。      
    可以使用下面这些:      
     
| Key | Description	Default | 
| - | :- | 
| fieldNameSize | field 名字最大长度	100 bytes| 
| fieldSize | field 值的最大长度	1MB | 
| fields | 非文件 field 的最大数量	无限 | 
| fileSize | 在 multipart 表单中，文件最大长度 (字节单位)	无限 |
| files | 在 multipart 表单中，文件最大数量	无限 |
| parts | 在 multipart 表单中，part 传输的最大数量(fields + files)	无限 |
| headerPairs | 在 multipart 表单中，part 传输的最大数量(fields + files)	无限      在 multipart 表单中，键值对最大组数	2000|

设置 limits 可以帮助保护你的站点免受拒绝服务 (DoS) 攻击。

- 20.3、fileFilter
设置一个函数来控制什么文件可以上传以及什么文件应该跳过，这个函数应该看起来像这样：       
```javascript
function fileFilter (req, file, cb) {

  // 这个函数应该调用 `cb` 用boolean值来
  // 指示是否应接受该文件

  // 拒绝这个文件，使用`false`，像这样:
  cb(null, false)

  // 接受这个文件，使用`true`，像这样:
  cb(null, true)

  // 如果有问题，你可以总是这样发送一个错误:
  cb(new Error('I don\'t have a clue!'))
}
```


