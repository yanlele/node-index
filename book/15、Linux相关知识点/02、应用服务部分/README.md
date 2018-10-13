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

