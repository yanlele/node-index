## Docker容器与镜像

目录
- [Docker核心](#class02-01)
- [Docker镜像](#calss02-02)
 -[打包自己的一个image](#class02-03)



### <div class="class02-01">Docker核心</div>
Docker 的核心组件包括：                         
- Docker 客户端 - Client
- Docker 服务器 - Docker daemon
- Docker 镜像 - Image
- Registry
- Docker 容器 - Container

![1](http://7xo6kd.com1.z0.glb.clouddn.com/upload-ueditor-image-20170425-1493117446353024350.jpg)

虚拟机的启动可以参看 本目录下的 `vagrantfile`和 `setup.sh` 两个文件。启动方式参看第一篇文章


### <div class="calss02-02">Docker镜像</div>
什么是镜像的话，直接看这个文章： [10张图带你深入理解Docker容器和镜像](http://dockone.io/article/783)

#### 镜像的获取
**方式1、Dockerfile**                  

一个简单的 `Dockerfile` 示例
```bash
FROM Debian:8
LABEL maintainer="yanle <331393627@qq.com>"
RUN apt-get update && apt-get install -y redis-server
EXPORT 6379
ENTRYPOUNT ["/usr/bin/redis-server"]
```
然后使用docker 打包命令： `docker build -t yanlele/redis:latest .`

只是一个简单的示范， 后续更多内容接着整理                       



**方式2、pull from Registry**
- [DockerHub:https://hub.docker.com](https://hub.docker.com)

`docker Registry` 是一个类似于GitHub的一个东西， 我们可以从Registry中拉取我们想要的image, 
也可以比我们自己的image 直接push 到 Registry 上去

举一个非常简单的例子， 我们从 `docker Registry` 中拉去一个 `debian` : `sudo docker pull debian:8`                              
拉去完成之后， 就可以看到本地的 `docker image`: `sudo docker image ls`                     
```
[vagrant@docker-host ~]$ sudo docker image ls
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
debian              8                   7cd9fb1ee74f        10 days ago         129MB
```

我们所有的 `docker Registry` 的镜像都是放置在 [DockerHub:https://hub.docker.com](https://hub.docker.com) 上的。
所有的镜像分为官方镜像和个人镜像， 其他的以后慢慢研究。


### <div class="02-03">打包自己的一个image</div>


### 其他补充
我们每次运行 `docker` 命令行的时候， 就需要用到 `sudo`, 那么如何取消这个 `sudo` 呢                         
- 添加一个docker group : `sudo groupadd docker`
- 添加当前用户到group: `sudo gpasswd -a vagrant docker`
- 重启docker服务： `sudo service docker restart`
- 如果还是不行， 尝试重新登录虚拟机


参考文章
- [Docker 架构详解](https://www.cnblogs.com/CloudMan6/p/6763789.html)
- [几张图帮你理解 docker 基本原理及快速入门](https://www.cnblogs.com/SzeCheng/p/6822905.html)
- [10张图带你深入理解Docker容器和镜像](http://dockone.io/article/783)
- [dcoker入门,使用docker部署NodeJs应用](https://www.cnblogs.com/pass245939319/p/8473861.html)



