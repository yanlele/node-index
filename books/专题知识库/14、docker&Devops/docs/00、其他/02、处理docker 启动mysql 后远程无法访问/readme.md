## docker 启动mysql 后远程无法访问

1、虚拟机的centos 中安装 docker 的mysql 镜像。                          
`docker run --name mysql01 -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql:latest`                          

2、进入镜像中的mysql（ti 后面的字符串是mysql镜像ID）
`docker exec -ti 2cbb0f246353 /bin/bash`                        

3、登录mysql                       
`mysql -u root -p`

4、修改root 可以通过任何客户端连接
`ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';`
