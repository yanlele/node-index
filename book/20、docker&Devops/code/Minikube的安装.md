# Minikube的下载和安装

Minikube是一个快速搭建单节点Kubenetes集群的工具，大家可以把它和docker Machine进行类比。

## 1. 安装Minikube可执行程序

MAC

```
brew cask install minikub
```

Linux

```
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

Windows


从 https://storage.googleapis.com/minikube/releases/latest/minikube-windows-amd64.exe 下载重命名成`minikube.exe`,然后把这个文件的所在目录添加到系统环境变量PATH里。


安装完以后，我们可以通过minikube version 查看系统版本

```
➜  ~ minikube version
minikube version: v0.25.0
➜  ~
```


## 2.安装kubectl

参考https://kubernetes.io/docs/tasks/tools/install-kubectl/


Mac

```
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/darwin/amd64/kubectl
$ chmod +x ./kubectl
$ sudo mv ./kubectl /usr/local/bin/kubectl
```

Linux

```
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
$ chmod +x ./kubectl
$ sudo mv ./kubectl /usr/local/bin/kubectl
```

Windows


下载exe https://storage.googleapis.com/kubernetes-release/release/v1.9.0/bin/windows/amd64/kubectl.exe
然后添加到系统PATH环境变量里


安装完以后可以查看版本（我们会看到它有一个报错，因为连不上k8s api server，这个很正常，因为k8s节点还创建呢）

```
➜  ~ kubectl version
Client Version: version.Info{Major:"1", Minor:"9", GitVersion:"v1.9.3", GitCommit:"d2835416544f298c919e2ead3be3d0864b52323b", GitTreeState:"clean", BuildDate:"2018-02-07T12:22:21Z", GoVersion:"go1.9.2", Compiler:"gc", Platform:"darwin/amd64"}
The connection to the server localhost:8080 was refused - did you specify the right host or port?
```

## 3.安装Virtualbox

因为minikube创建K8S虚机是通过Virtualbox来做的（当然还有其它driver，比如KVM，vmware这里就不介绍了）

https://www.virtualbox.org/wiki/Downloads 根据自己的操作系统下载安装


## 3. 运行minikube程序创建k8s


通过 `minikube starat` 去创建k8s环境。如下所示。速度根据个人网速而不同，因为需要下载东西。

```
➜  ~ minikube start
Starting local Kubernetes v1.9.0 cluster...
Starting VM...
Downloading Minikube ISO
 142.22 MB / 142.22 MB [============================================] 100.00% 0s
Getting VM IP address...
Moving files into cluster...
Downloading localkube binary
 162.41 MB / 162.41 MB [============================================] 100.00% 0s
 0 B / 65 B [----------------------------------------------------------]   0.00%
 65 B / 65 B [======================================================] 100.00% 0sSetting up certs...
Connecting to cluster...
Setting up kubeconfig...
Starting cluster components...
Kubectl is now configured to use the cluster.
Loading cached images from config file.
```

执行结束以后呢，我们可以通过`kubectl cluster-info` 去连一下k8s api server.

```
➜  ~ kubectl cluster-info
Kubernetes master is running at https://192.168.99.100:8443

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
➜  ~
```

但是，但是，此时并不代表，整个k8s集群搭建好了，因为k8s里的服务还需要起，比如API server，scheduler，kubelet等等，他们都是以容器的方式在后台启动。

那怎么判断成功了呢？

我们可以通过minikube ssh进到虚机里，然后看看是否有一些container运行起来了

```
➜  ~ minikube ssh
                         _             _
            _         _ ( )           ( )
  ___ ___  (_)  ___  (_)| |/')  _   _ | |_      __
/' _ ` _ `\| |/' _ `\| || , <  ( ) ( )| '_`\  /'__`\
| ( ) ( ) || || ( ) || || |\`\ | (_) || |_) )(  ___/
(_) (_) (_)(_)(_) (_)(_)(_) (_)`\___/'(_,__/'`\____)

$ docker ps
CONTAINER ID        IMAGE                                      COMMAND                  CREATED             STATUS              PORTS               NAMES
c1aec3464788        gcr.io/k8s-minikube/storage-provisioner    "/storage-provisioner"   8 minutes ago       Up 8 minutes                            k8s_storage-provisioner_storage-provisioner_kube-system_05db116c-236a-11e8-985b-08002709a6e3_0
f36a4455bc73        fed89e8b4248                               "/sidecar --v=2 --..."   8 minutes ago       Up 8 minutes                            k8s_sidecar_kube-dns-54cccfbdf8-c7k5b_kube-system_0649fdef-236a-11e8-985b-08002709a6e3_0
e49e279c5717        459944ce8cc4                               "/dnsmasq-nanny -v..."   8 minutes ago       Up 8 minutes                            k8s_dnsmasq_kube-dns-54cccfbdf8-c7k5b_kube-system_0649fdef-236a-11e8-985b-08002709a6e3_0
1ec9842ec31d        512cd7425a73                               "/kube-dns --domai..."   8 minutes ago       Up 8 minutes                            k8s_kubedns_kube-dns-54cccfbdf8-c7k5b_kube-system_0649fdef-236a-11e8-985b-08002709a6e3_0
805346db62f0        e94d2f21bc0c                               "/dashboard --inse..."   8 minutes ago       Up 8 minutes                            k8s_kubernetes-dashboard_kubernetes-dashboard-77d8b98585-ghb5p_kube-system_0630dbdf-236a-11e8-985b-08002709a6e3_0
2c3edf77349e        gcr.io/google_containers/pause-amd64:3.0   "/pause"                 8 minutes ago       Up 8 minutes                            k8s_POD_kube-dns-54cccfbdf8-c7k5b_kube-system_0649fdef-236a-11e8-985b-08002709a6e3_0
19313f1076da        gcr.io/google_containers/pause-amd64:3.0   "/pause"                 8 minutes ago       Up 8 minutes                            k8s_POD_kubernetes-dashboard-77d8b98585-ghb5p_kube-system_0630dbdf-236a-11e8-985b-08002709a6e3_0
a340e072f095        gcr.io/google_containers/pause-amd64:3.0   "/pause"                 8 minutes ago       Up 8 minutes                            k8s_POD_storage-provisioner_kube-system_05db116c-236a-11e8-985b-08002709a6e3_0
dab3d03f880b        d166ffa9201a                               "/opt/kube-addons.sh"    8 minutes ago       Up 8 minutes                            k8s_kube-addon-manager_kube-addon-manager-minikube_kube-system_c4c3188325a93a2d7fb1714e1abf1259_0
75c8fe4570a1        gcr.io/google_containers/pause-amd64:3.0   "/pause"                 8 minutes ago       Up 8 minutes                            k8s_POD_kube-addon-manager-minikube_kube-system_c4c3188325a93a2d7fb1714e1abf1259_0
```

然后退出来，在本地运行`minikube dashboard` 会在本地弹出浏览器，就是Kubernetes的dashboard，那基本上恭喜您，安装成功了。

```
➜  ~ minikube dashboard
Opening kubernetes dashboard in default browser...
➜  ~
```

