## docker环境搭建


有远程服务器上面的虚拟机，啥都好说， 怎么安装就不多说了。                       
网上自行找安装文章， 看官网也行， 看这个文章也行： [centos7安装docker](https://note.youdao.com/ynoteshare1/index.html?id=86fe5f7ae74004c70eade69edc54f8ea&type=note)
`docker --version` 可以查看docker 版本
`docker version` 可以查看docker 运行情况                        
如果都没有问题，就说明是安装好了的。

注意： 千万不要在本地尝试安装docker 作为学习使用(因为环境依赖会产生很多的没有必要的依赖包， 但是这些依赖包删除又是很麻烦的事儿。
如果都安装在虚拟机里面， 删除的时候， 直接删除我们的虚拟机， 就会方便非常多。)


### 如果没有云服务器
直接在本地计算机开启虚拟机就可以了， 建议使用VirtualBox+vagrant 

比如说我们要创建一个centos7 的虚拟机， 用vagrant 命令行直接： `vagrant init centos/7` 。
这个时候就直接会给我们初始化一个 `Vagrantfile` 的文件，这个文件就是配置一些列的 vagrant 的配置, `more Vagrantfile` 可以查看详情
里面有详细的文档， 但是重要的就是这两句话：
```
Vagrant.configure("2") do |config|
  config.vm.box = "centos/7"
```
表示我们要启动的是一个 `centos7` 的一个虚拟机

有了 `Vagrantfile` 之后， 我们可以直接在 `Vagrantfile` 的目录下面直接启动 `vagrant up`               
这个过程首先要去找 centos7 的一个basebox 如果，本地有的话， 直接就从本地加载过来， 如果本地没有镜像， 就会直接去下载（过程很漫长）。


                  
参考文章:                   
- [征服诱人的Vagrant！](https://www.cnblogs.com/hafiz/p/9175484.html)
- [使用 Vagrant 打造跨平台开发环境](https://segmentfault.com/a/1190000000264347)

