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

**第一次安装mysql的相关配置**
查看密码： `cat var/log/mysqld.log|grep password`                                
拿到密码之后， 就可以直接通过命令行进入mysql了： `mysql -uroot -p`;

输入初始密码，此时不能做任何事情，因为MySQL默认必须修改密码之后才能操作数据库：
修改密码： `set password=password('123456');` 或者 `ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';`
                           
一般来说当密码过于简单的时候会报错 `ERROR 1819 (HY000): Your password does not satisfy the current policy requirements` ;                                
原因是因为MySQL有密码设置的规范，具体是与validate_password_policy的值有关：                        
可以通过如下命令修改：
```
mysql> set global validate_password_policy=0;
mysql> set global validate_password_length=1;
```
再次之后修改密码成功；


**远程连接**
第一次连接远程连接的时候是连接不上的， 还需要进行设置;
现在远程服务器登录进入mysql；                               
shwo databases; 就可以看到里面有一个mysql 数据库， 进入这个库 `use mysql`; `show tables;`就可以看到里面会有一个user 的表；                               
`update user set host="%" where Host="localhost" and User="root";` 执行这个语句就可以直接赋予权限， 任何主机都可以连接， 账号是root;                     
然后刷新权限： `fulsh privileges;` 就可以连接mysql了， 如果还有安全组， 就添加安全组， 如果有防火墙，就关闭防火墙： `service firewalld stop`;                                  
一般来说这样之后， 就可以进行远程连接了。


#### genelog
首先要在服务器上登录mysql;                                
`set global general_log_file="/tmp/general.log";`                             
然后设置开关: `set global general_log=on;`                                        

这个日志就可以记录我们所有数据库操作语句


#### 创建用户操作
首先要在服务器上登录mysql;                                    
`create user 'yanle'@'%' identified by '123456'`;  
赋予权限： grant all privileages on *.* to 'yanle'@'%' identified by '123456' with grant option;                     

关于数据库相关权限问题， 以及其他知识点儿。看转专题14就可以了；

**如果忘记密码， 找回和重置密码的方式**：                                     
vim /etc/my.conf                        
然后在最后添加一行： skip-grant-tables                    
重启服务mysql, 之后就可以不需要密码就进入了。然后修改密码就可以了。
`update user set authentication_string=password("123456") where user='root'`;                                   
然后刷新权限， 删除那一句命令行就可以了。



### <div id="class03-02">02、缓存服务</div>
#### Redis基本操作                                                       

说明 | 命令
:-|:-
安装 | 源码比编译安装
启动 | redis-server start/restart
停止 | redis-server stop
客户端 | redis-clict

redis扩展知识点：                                                                       
//..... 后续自己补充                              
如果经常需要查看某个端口是否是启动的， 可以用telnet 来查看服务是否启动；


**Redis的安装**                                                    
首先在tmp 文件目录下面直接下载文件源码： `wget http://download.redis.io/releases/redis-4.0.2.tar.gz`;                                     
```
tar -xzvf redis-4.0.2.tar.gz
cd redis-4.0.2
make
make install
```
Redis没有其他外部依赖，安装过程很简单。编译后在Redis源代码目录的src文件夹中可以找到若干个可执行程序，安装完后，在/usr/local/bin目录中可以找到刚刚安装的redis可执行文件。

**启动和停止Redis**                                                                          
直接在安装目录src里面运行./redis-server即可启动Redis                           
也可以在在/usr/local/bin目录中可以找到刚刚安装的redis可执行文件。                                                  
通过初始化脚本启动Redis: 
在Redis源代码目录的utils文件夹中有一个名为 `redis_init_script` 的初始化脚本文件。需要配置Redis的运行方式和持久化文件、日志文件的存储位置。步骤如下：
更多内容可以参看这个文章：[CentOS下Redis的安装](https://www.cnblogs.com/renzhicai/p/7773080.html)