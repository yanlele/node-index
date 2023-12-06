## Swarm

> 文章链接 https://github.com/yanlele/node-index/issues/72

### <div id="class06-01">01、创建三个节点的Swarm集群</div>

创建三台虚拟机 分别命名为`docker-manager  docker-worker1  docker-worker2`                       


先进入 `docker-manager` 节点                     
初始化一个docker swarm : `docker swarm init --advertise-addr=[ip]` 初始化节点成功只会， 会给出一个 `To add a worker to this swarm command`:                 
拿到这个之后， 直接 copy 到其他的虚拟机就可以了。 

装完之后， 在manager 节点 可以查看节点相关信息： `docker node ls`



### <div id="class06-02">02、维护和水平扩展</div>
`docker service create --help` 就可以查看帮助                                  
service 的创建： `docker service create --name demo busybox sh -c "while true; do sleep 3600; done"`                                                  
创建完成之后通过： `docker service ls ` 可以查看创建的service                                   
实际上就是类似于创建了一个container                                  

查看详细情况可以通过 `docker service ps demo`                     

我们这个service是可以横向扩展的， 可以将扩展为多个                           
扩展方式： `docker service scale --help`查看帮助                     
扩展多个： `docker sercice scale demo=5` 这样启动的五个服务是，平均分布在 3 个机器上面的。                      
如果强制删除某一个容器： `docker rm -f [conatiner id]` ， 但是过了一会儿， 又启动了一个。 
实际上是发现失效了一个节点， 但是它会自动在均匀分布的机器上再次启动一个服务。 达到指定服务数量。  

删除容器： `docker service rm demo`


### <div id="class06-03">03、通过swarm部署wordpress</dvi>
部署一个WordPress， 如果 mysql 和 web 并不是部署在同一台机器上面的， 而是不是到不同机器上面的。 
首先在`swarm-manager`容器上创建一个 `overlay` 网络： `docker network create -d overlay demo`                     
然后通过： `docker network ls` 看看网络

在 `docker-mangaer` 创建mysql:  `docker service create --name mysql --env MYSQL_ROOT_PASSWORD=root --env MYSQL_DATABASE=wordpress --network demo --mount type=volume,source=mysql-data,destination=/var/lib/mysql mysql`                                
创建之后， 就可以通过 `docker service ls` 看到创建的容器了， 通过 `docker service ps mysql` 可以看到容器创建的地点。                     
发现这个容器运行在 `docker-manager` 节点上面的。


在 `docker-manager` 创建第二个服务， WordPress: `docker service create --name wordpress -p 80:80 --env WORDPRESS_DB_PASSWORD=root --ENV WPRDPRESS_DB_HOST=mysql --network=demo wordpress`                       
通过 `docker service ps wordpress` 发现这个服务运行在了 `docker-worker2` 节点上面了， 可以去 `dcoker-worker2` 看看容器运行情况。 

我们通过 `docker-worker2` 的 ip  访问， 是可以访问到 `wordpress` 的。 如果我们通过 `docker-manager 和 docker-worker1` 也是可以访问到的。 
但是我们并没有在 `docker-manager 和 docker-worker1` 看到预期相对应的 容器。 但是依然可以访问。 这就是通过 swarm 同步网络创建实现的。 



### <div id="class06-04">04、集群服务之间的通信RoutingMesh</div>
.........



 

