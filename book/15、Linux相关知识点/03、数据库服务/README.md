## <div class=""03>数据库服务</div>

### <div class="03-01">01、mysql</div>

#### mysql的安装以及连接

说明 | 命令
:-|:-
安装 | yum install mysql-community-server
启动 | service mysqld start/restart
停止 | service mysqld stop

**CentOS7安装MySQL**
下载并安装MySQL官方的 Yum Repository                            
`[root@localhost ~]# wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm`                               
用上面的命令就直接下载了安装用的Yum Repository，大概25KB的样子，然后就可以直接yum安装了。

`[root@localhost ~]# yum -y install mysql57-community-release-el7-10.noarch.rpm`                                
 之后就开始安装MySQL服务器。                               
 
`[root@localhost ~]# yum -y install mysql-community-server`                                        
然后就可以把服务安装完成了。
安装完成之后， 直接 `service mysqld start` 就可以启动服务了
