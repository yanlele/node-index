## path 的常用api
- normalize 处理路径，修复和优化路径结构的
- join 可以帮我们拼接路径，如果路径不是很标准，可以帮我们处理一下。(内部相当于调用了一次normalize)
- resolve 可以把相对路径处理为聚堆路径
- 关于name 的三个api
    - basename 文件名
    - dirname 文件所处的路径
    - extname 文件的扩展名