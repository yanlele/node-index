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

