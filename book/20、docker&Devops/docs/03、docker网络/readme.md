## Docker网络

主要分为 单机网络 和 多机网络


### <div id="class03-01">基础网络知识</div>

比如笔记本访问别人的网络， 都是通信包访问的， http协议；                     
略........

路由的概念： 略..........

ip地址和路由：                            
ip 地址是网络唯一标识 略.........

共有IP 和 私有 IP：                       
共有IP 是唯一标识， 可以访问internet                                          
私有IP 不可以在互联网使用， 仅供机构内部使用(例如校园网、公司内网)                            

网络地址转换 NAT:                         
这个可以理解为一个翻译， 比如作为一个校园网， 有一个或者有几个共有IP地址， 
校园内网私有IP 访问外部网络的时候， 先经过 NAT 的转换， NAT 就记住了私有IP和端口， 然后发送请求。                       
返回成功之后， 回到NAT 就查询是哪个私有地址访问的，然后数据包就回到该访问的私有地址。

Ping(ICMP协议) 和 telnet                   
Ping：验证IP的可达性                       
```
[vagrant@docker-node1 ~]$ ping www.baidu.com
PING www.a.shifen.com (180.97.33.107) 56(84) bytes of data.
64 bytes from 180.97.33.107 (180.97.33.107): icmp_seq=1 ttl=63 time=44.0 ms
64 bytes from 180.97.33.107 (180.97.33.107): icmp_seq=2 ttl=63 time=91.3 ms
64 bytes from 180.97.33.107 (180.97.33.107): icmp_seq=3 ttl=63 time=38.6 ms
64 bytes from 180.97.33.107 (180.97.33.107): icmp_seq=4 ttl=63 time=43.5 ms
64 bytes from 180.97.33.107 (180.97.33.107): icmp_seq=5 ttl=63 time=55.7 ms
^C
--- www.a.shifen.com ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4011ms
rtt min/avg/max/mdev = 38.671/54.664/91.302/19.155 ms
```

telnet: 验证服务的可用性





