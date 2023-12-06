## docker的持久化存储与数据共享

> 文章链接  https://github.com/yanlele/node-index/issues/70


### <div id="class04-01">01、基础概念</div>
如果我们在container 写数据， 那么只限于这个container, 删除就没有了。                   
有一个这样的需求， 数据库是放在某一个容器里面的， 希望数据不会随着容器的删除而丢失， 希望容器数据库保存的数据可以共享。 

#### Docker持久化数据方案
- 基于本地文件系统的Volume                           
- 基于plugin的Volume, 支持第三方的存储方案， 比如NAS, aws                           

主要是为第一种方案为主。


#### Vagrant 插件
如果要把文件弄到虚拟机里面， 最简单的办法就是直接 `git clone xxxx` 就可以了。                            

还有一个办法就是使用vagrant 的插件                       
`vagrant plugin list` 这个就可以拿到本地 vagrant 的插件有哪些。                   
通过 `vagrant plugin install XXXX` 就可以安装查价了。              

`vagrant plugin install vagrant-scp` 去安装插件， 安装这个插件之后， 就可以本地目录拷贝到 vagrant 虚拟机上面了。                        

插件使用： `vagrant scp [local path] [virtualbox-name]:/home/vagrant/labs` 就可以把本地目录推送到虚拟机里面去了

### <div id="class04-02">02、数据持久化:Data Volume</div>
实际上在创建数据的容器的时候， 就会缠上一个 volume , 用来存放数据库产生的数据

`sudo docker run -d --name=mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql` 直接启动mysql 容器                      
`sudo docker logs mysql` 可以查看日志                         
`sudo docker volume ls` 就可以看到刚才创建docker的时候， 就也创建了 volume                 
`sodu docker volume rm [volume ID]` 删除创建的volume                         
`sudo docker volume inspect [volume id]` 可以看看具体的volume 信息

```bash
[vagrant@docker-host ~]$ docker volume inspect c224d6da05a13fe09dd87a75afdf887c203acf72ec3eab545392af0b4f24a39a
[
    {
        "CreatedAt": "2019-06-08T14:20:16Z",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/c224d6da05a13fe09dd87a75afdf887c203acf72ec3eab545392af0b4f24a39a/_data",
        "Name": "c224d6da05a13fe09dd87a75afdf887c203acf72ec3eab545392af0b4f24a39a",
        "Options": {},
        "Scope": "local"
    }
]
```
有这样一个信息 `"Mountpoint": "/var/lib/docker/volumes/c224d6da05a13fe09dd87a75afdf887c203acf72ec3eab545392af0b4f24a39a/_data",` 这个是产生的数据， 就放置的位置。 这个地方是方式在本地位置的。                              
如果创建两个 mysql 容器， 如果我们删除 创建的mysql 容器， 就会发现一个情况，我们的volume 实际上还是在的。 但是有一个问题，就是volume 的名字很不友好， 是随机生成的。

`sudo docker run -d -v mysql:/var/lib/mysql --name=mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql` 给volume起别名                                          
如果创建别的数据库的时候， 需要使用到我们的这个volume 的情况， 只需要创建的时候，用一样的别名就OK了                 

### <div id="class04-03">03、数据持久化:Bind Mouting</div>
运行容器的时候， 指定本地目录和容器目录数据存放的一个映射关系。 两个地方地方的容器是同步更新的。                   

`sudo docker run -d -v $(pwd):/var/lib/mysql --name=mysql -e MYSQL_ALLOW_EMPTY_PASSWORD=true mysql`
使用这种方式的前提条件是， mac 要能够映射到 虚拟机。




