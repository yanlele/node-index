## 处理vagrant下载镜像包过慢的情况处理

国内下载 vagrant 镜像包几乎是不可能的，太慢了， 但是可以吧镜像包下载到本地， 通过：
`vagrant box add [title] [url]` 的方式本地安装， 然后使用
`vagrant init [title]` 的方式初始化 vagrant 就可以了。

镜像地址： [http://www.vagrantbox.es/](http://www.vagrantbox.es/)                        
使用迅雷下载。

然后使用本地安装方式就可以了。
