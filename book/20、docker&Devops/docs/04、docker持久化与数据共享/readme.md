## docker的持久化存储与数据共享


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

插件使用： `vagrant scp [local path] [virtualbox-name]:/home/vagtant/labs` 就可以把本地目录推送到虚拟机里面去了

### <div id="class04-02">02、数据持久化:Data Volume</div>
`sudo docker run -d --name=mysql -e MYSQL_ALLOW_EMPTY_PASSWORD mysql`
