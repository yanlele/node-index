## docker环境搭建

目录
- [如果没有云服务器怎么搭建Docker环境](#class01-01)
- [CentOs7安装Docker](#CentOs7安装Docker)


有远程服务器上面的虚拟机，啥都好说， 怎么安装就不多说了。                       
网上自行找安装文章， 看官网也行， 看这个文章也行： [centos7安装docker](https://note.youdao.com/ynoteshare1/index.html?id=86fe5f7ae74004c70eade69edc54f8ea&type=note)
`docker --version` 可以查看docker 版本
`docker version` 可以查看docker 运行情况                        
如果都没有问题，就说明是安装好了的。

注意： 千万不要在本地尝试安装docker 作为学习使用(因为环境依赖会产生很多的没有必要的依赖包， 但是这些依赖包删除又是很麻烦的事儿。
如果都安装在虚拟机里面， 删除的时候， 直接删除我们的虚拟机， 就会方便非常多。)


### <div id="class01-01">如果没有云服务器</div>
直接在本地计算机开启虚拟机就可以了， 建议使用VirtualBox+vagrant 


#### 基本安装
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
然后如果安装成功之后， 直接去看我们的 `VirtualBox` 就会发现一个正在运行的 `centos7` 了

当我们直接创建好了之后 我们可以直接运行 `vagrant ssh` 就可以登录到我们创建好的那个 `centos7` 系统了(当然要牢记我们进入的文件目录， 以为系统是放在当前指定的文件目录下面的)
当我们需要分享我们的虚拟机的时候，只用分享我们的 `Vagrantfile` 就可以了。

#### 基本使用
vagrant box基本命令:                    
- `vagrant box list` 列出本地环境中所有的box
- `vagrant box add box-name(box-url)` 添加box到本地vagrant环境
- `vagrant box update box-name` 更新本地环境中指定的box
- `vagrant box remove box-name` 删除本地环境中指定的box
- `vagrant box repackage box-name` 重新打包本地环境中指定的box
- [https://app.vagrantup.com/boxes/search](https://app.vagrantup.com/boxes/search) 在线查找需要的box

vagrant基本命令:                    
- `vagrant init [box-name]` 在空文件夹初始化虚拟机
- `vagrant up` 在初始化完的文件夹内启动虚拟机
- `vagrant ssh` ssh登录启动的虚拟机
- `vagrant suspend` 挂起启动的虚拟机
- `vagrant reload` 重启虚拟机
- `vagrant halt` 关闭虚拟机
- `vagrant status` 查找虚拟机的运行状态
- `vagrant destroy` 销毁当前虚拟机

这个过程中最重要的是 `Vagrantfile`， 这个文件的配置， 可以直接去官方网站看就可以了


                  
参考文章:                   
- [征服诱人的Vagrant！](https://www.cnblogs.com/hafiz/p/9175484.html)
- [使用 Vagrant 打造跨平台开发环境](https://segmentfault.com/a/1190000000264347)



### <div class="class01-02">CentOs7安装Docker</div> 
#### 简要说一下安装步骤                      
首先卸载之前的依赖： `sudo yum remove docker  docker-common docker-selinux docker-engine`                         
安装驱动包： `sudo yum install -y yum-utils device-mapper-persistent-data lvm2`                   
设置yum源： `sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo`                                    
可以查看所有仓库中所有docker版本，并选择特定版本安装： `yum list docker-ce --showduplicates | sort -r`                          
安装docker: `sudo yum install docker-ce  #由于repo中默认只开启stable仓库，故这里安装的是最新稳定版`
    或者: `sudo yum install <FQPN>  # 例如：sudo yum install docker-ce-17.12.0.ce`                       
启动并加入开机启动: `sudo systemctl start docker` 、 `sudo systemctl enable docker`                       
验证安装是否成功(有client和service两部分表示docker安装启动都成功了)： `docker version`                          
```
[vagrant@localhost yum.repos.d]$ sudo docker version
Client:
 Version:	17.12.0-ce
 API version:	1.35
 Go version:	go1.9.2
 Git commit:	c97c6d6
 Built:	Wed Dec 27 20:10:14 2017
 OS/Arch:	linux/amd64

Server:
 Engine:
  Version:	17.12.0-ce
  API version:	1.35 (minimum version 1.12)
  Go version:	go1.9.2
  Git commit:	c97c6d6
  Built:	Wed Dec 27 20:12:46 2017
  OS/Arch:	linux/amd64
  Experimental:	false
[vagrant@localhost yum.repos.d]$ docker list
docker: 'list' is not a docker command.
See 'docker --help'
```

官方有个demo `hello-world` 我们可以下载下来看一看:  `sudo docker run hello-world`                                        
问题来了， 本地是没有 `hello-world` ， 是通过 `docker hub` 拉去的。


#### 通过`vagrantFile`启动虚拟机的时候自动安装docker
```
  config.vm.provision "shell", inline: <<-SHELL
    sudo yum remove docker  docker-common docker-selinux docker-engine
    sudo yum install -y yum-utils device-mapper-persistent-data lvm2
    sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    sudo yum install docker-ce-17.12.0.ce
    sudo systemctl start docker
  SHELL
```
然后重新安装 `vagrant up` 就可以搞定了




#### 在这过程中可能还需要解决几个问题
- [Linux系统软件安装更新下载太慢解决方法（更换国内源）](https://blog.csdn.net/weixin_38034182/article/details/76672906)
- [CentOS7上安装Docker并使用镜像加速解决docker拉取慢问题](https://www.jianshu.com/p/d611047c4387)
- [安装Docker](https://help.aliyun.com/document_detail/60742.html)


参考文章：
- [centos7安装docker](https://note.youdao.com/ynoteshare1/index.html?id=86fe5f7ae74004c70eade69edc54f8ea&type=note)
- [Linux系统软件安装更新下载太慢解决方法（更换国内源）](https://blog.csdn.net/weixin_38034182/article/details/76672906)
- [CentOS7上安装Docker并使用镜像加速解决docker拉取慢问题](https://www.jianshu.com/p/d611047c4387)
- [安装Docker](https://help.aliyun.com/document_detail/60742.html)