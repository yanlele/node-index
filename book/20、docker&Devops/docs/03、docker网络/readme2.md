## Docker网络

主要分为 单机网络 和 多机网络

### <div id="class03-04">04、容器之间的link</div>
创建容器之前， 可以给容器一个name, 创建第二个容器的时候， 也给一个name。 两个容器之间可以通过name link 起来，
这样就不需要每次都通过ip link 起来了。 

首先启动上一节的test1容器: `docker start tset1`                   
重新创建test2 容器， 通过link 的方式: 
`docker run -d --name=test2 --link test1 busybox /bin/sh -c "while true; do sleep 3600; done"`
做了这样的操作之后， 进入test2 的bin/sh: `docker exec -it test2 /bin/sh`.
就可以直接ping test1了， 而且还可以ping 通.
```bash
[vagrant@docker-node1 ~]$ docker exec -it test2 /bin/sh
/ # ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
13: eth0@if14: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
/ # ping test1
PING test1 (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: seq=0 ttl=64 time=0.112 ms
64 bytes from 172.17.0.2: seq=1 ttl=64 time=0.171 ms
64 bytes from 172.17.0.2: seq=2 ttl=64 time=0.150 ms
64 bytes from 172.17.0.2: seq=3 ttl=64 time=0.128 ms
--- test1 ping statistics ---
4 packets transmitted, 4 packets received, 0% packet loss
round-trip min/avg/max = 0.112/0.140/0.171 ms
```

但是反之， 是ping不通的， 因为link 是单向的。 

#### 自己创建一个bridge
命令行： `docker network create [OPTIONS] NETWORK [flags]`
创建命令： `docker network create -d bridge my-bridge`
```bash
[vagrant@docker-node1 ~]$ docker network create -d bridge my-bridge
c17581e7b9cf62b6a39ab4220313cd9246f9c598f2a1e8a1bf4896cdb8145fc4
[vagrant@docker-node1 ~]$ docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
4159a7a8ff49        bridge              bridge              local
ad589c9fa968        host                host                local
c17581e7b9cf        my-bridge           bridge              local
0dfc9dbf0808        none                null                local
[vagrant@docker-node1 ~]$ brctl show
bridge name	bridge id		STP enabled	interfaces
br-c17581e7b9cf		8000.02425a563121	no		
docker0		8000.02422e50fe40	no		veth6360140
```

新建一个container 链接到 新建的 bridge                        
`docker run -d --name=test3 --network my-bridge busybox /bin/sh -c "while true; do sleep 3600; done"`
```bash
[vagrant@docker-node1 ~]$ brctl show
bridge name	bridge id		STP enabled	interfaces
br-c17581e7b9cf		8000.02425a563121	no		veth6467873
docker0		8000.02422e50fe40	no		veth6360140
```
发现新建的就有端口了
可以通过 `docker network inspect [bridge id]` 查看 链接情况


#### 已经创建好的容器链接到新的bridge上
`sudo docker network connect [bridge] [continer]`
例如我们希望把 `test2` 链接到 `my-bridge` : `docker network connect my-bridge test2`

如果是两个容器都link 到自己新建的bridge 上面, 那么就是可以直接默认 --link 在一起。
意思就是， 比如， 我们把test2 和 test3 都链接到了`my-bridge`上面， 那么test2和test3 是可以通过ip ping 通。
但是直接ping name 也是可以ping通的。 

一个container是可以链接多个 bridge 的。 


### <div id="class03-05">05、容器的端口映射</div>
如果我们启动一个服务 `docker run -d --name web nginx`, 服务已经启动，在docker node 宿主机是可以访问的。 但是外界依然无法访问。                        

映射本地： `docker run -d --name=web -p 80:80 nginx`
```bash
[vagrant@docker-node1 ~]$ docker container ls
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                NAMES
29ac8c1c1d14        nginx               "nginx -g 'daemon of…"   2 minutes ago       Up 2 minutes        0.0.0.0:80->80/tcp   web
```
这个时候外面就可以访问了。











