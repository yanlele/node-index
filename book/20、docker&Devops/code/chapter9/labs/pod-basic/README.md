# Pod 基础

```
$ kubectl get pods   # 获取所有正在运行的POD
$ kubectl get pods -o wide   # 获取pod的更多信息，比如在哪台k8s机器上
$ kubectl describe pod <pod>   #获取一个POD的详细信息
$ kubectl exec <pod> <cmd>     #在pod里的container里执行一个命令，如果这个pod有多个container，默认会在第一个里执行，或者通过-c去指定哪个
   
```