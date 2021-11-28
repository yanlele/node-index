## 处理vagrant下载镜像包过慢的情况处理

国内下载 vagrant 镜像包几乎是不可能的，太慢了， 但是可以吧镜像包下载到本地， 通过：
`vagrant box add [title] [url]` 的方式本地安装， 然后使用
`vagrant init [title]` 的方式初始化 vagrant 就可以了。

镜像地址： [http://www.vagrantbox.es/](http://www.vagrantbox.es/)                        
使用迅雷下载。

但是总觉的上面那个镜像地址下载下来的镜像有点问题，怪怪的， 建议使用官方链接地址：                           
`vagrant box add centos/7`

```
Enter your choice: 3
==> box: Adding box 'centos/7' (v1905.1) for provider: virtualbox
    box: Downloading: https://vagrantcloud.com/centos/boxes/7/versions/1905.1/providers/virtualbox.box
    box: Download redirected to host: cloud.centos.org
    box: Progress: 13% (Rate: 19574/s, Estimated time remaining: 3:19:50)^C==> box: Waiting for cleanup before exiting...
==> box: Box download was interrupted. Exiting.
```

上面有一串地址链接： `https://vagrantcloud.com/centos/boxes/7/versions/1905.1/providers/virtualbox.box` 
直接把这个链接扔给迅雷下载就可以了。虽然速度也确实是一般般， 总比直接黑框框下载好多。


然后使用本地安装方式就可以了。
