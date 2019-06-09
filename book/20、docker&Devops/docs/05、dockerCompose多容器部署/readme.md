## Docker Compose 多容器部署

### <div id="class05-01">01、部署一个wordPress</div>
启动一个mysql 数据容器: `docker run -d --name=mysql -v mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=wordpress mysql:5.6`

启动WordPress： `docker run -d -e WORDPRESS_DB_HOST=mysql:3306 --link mysql -p 8080:80 wordpress`

然后直接去宿主机访问 ip:8080 就可以了

然后依次安装就OK了                                              


### <div id="class05-02">02、Docker Compose 是什么</div>
一个应用需要多个容器， 统一管理容器就显得很痛苦， Docker Compose 就是做这个事儿的 。 

是一个基于Docker 的一个工具， 可以定义yml文件来定义多个容器。

默认文件名： docker-compose.yml

三个基本概念： Services 、Networks、 Volumes

#### Services
一个service代表一个container， 可以从dockerHub拉取， 也可以从本地image 创建。                         
service启动类似于 docker run , 可以指定network和volume， 也可以直接指定其应用。                   
例如：
```yaml
services:
    db:
      image: postgres: 9.4
      volumes: 
        - "db-data:/var/lib/postgresql/data"
      networks:
        - back-tier
```
上面这个实际上就是这样： `docker run -d --network back-tier -v db-data:/var/lib/postgresql/data postgres:9.4`

```yaml
servies: 
    worker:
      build: ./worker
      links:
        - db
        - redis
      networks:
        - back-tier
```











