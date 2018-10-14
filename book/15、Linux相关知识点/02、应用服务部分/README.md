## 应用服务部分

### <div id="class02-01">01、Apache的安装</div>

说明 | 命令
:-|:-
安装 | yum install httpd
启动 | service httpd start
停止 | service httpd stop

启动之后可以坚挺进程： `ps -ef | grep httpd`                   
启动之后，就可以拿着公网IP 去访问，默认80端口。                  
可以查看网络状态： `netstat -anpl|grep 'http'`
如果开启服务之后还是无法访问页面，检查防火墙情况，这里可以选择直接关闭防火墙： service firewalld stop

在这个地方有一个很坑的地方，我的轻量云服务器默认是启动了nginx 的, 而且nginx 没有安装环境变量。所以必须要手动去停止nginx. `nginx -s stop`;

### <div id="class02-02">02、Apache的虚拟主机和静态资源操作</div>
#### 配置虚拟主机
配置虚拟主机的目的是为了一个服务器，可以部署多个网站

首先要进入的目录： /etc/httpd/conf
这个时候我们要修改目录下面的 httpd.conf 文件
全局搜索 virtual 关键字
搜索到了之后，在其后面添加内容：                                            
![01](../img/01.png)                        
然后保存退出之后重启服务器;



