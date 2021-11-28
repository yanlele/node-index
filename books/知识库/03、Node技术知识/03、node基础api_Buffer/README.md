# buffer

有两个要点：
buffer用于处理二进制数据流的   
实例类似整数数组、大小固定   
c++代码在V8堆外分配物理内存    

## 常用api
- alloc 创建一个buffer对象，第一个参数为长度，第二个参数为默认值多少
- from 也是创建一个buffer对象,第一个参数可以接受一个字符串也可以接受一个数组，第二个参数接受一个编码格式
- btyeLength 接受一个参数，返回当前参数占用了几个字节
- isBuffer 判断是不是一个buffer对象
- concat 拼接buffer

## Buffer 实例上的方法
- length 申请的空间是多少，就返回多少
- toString 转为一个string对象,可以附带一个可选参数，表示转为字符串的格式
- file 可以用来填充值的一些属性,接受三个参数，第一个为填充内容，第二个是起始填充位置，第三个参数是截止位置之前
- equals 比较buffer内容是否一样
- indexOf 获取指定参数在buffer中的index位置坐标

## 解决中文乱码的一些方案 
- string_decoder模块和StringDecoder实例函数

