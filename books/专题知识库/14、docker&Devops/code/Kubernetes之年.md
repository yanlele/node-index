(封面图：Dockercon17，Solomon Hykes FOUNDER, CTO AND CHIEF PRODUCT OFFICER of Docker)

2月底，我的<系统学习Docker，CI/CD践行DevOps理念>实战课程就要上线了，这个课程是对我从2014年接触和使用Docker/Kuberntes以来的总结和分享，想写一点东西来梳理下这几年容器生态圈发生的故事。（这里也安利下这个实战课程，这个课程内容丰富，包括Docker的基础讲解，镜像，容器，单机多机网络，docker-Compose，Docker swarm，Docker Cloud，Docker企业版，Kubernetes，容器监控，以及多个CI/CD实践等）

2017年底在美国德州Austin的Dockercon17上，[Docker宣布支持Kubernetes][1]，至此基本宣告在容器编排领域，Kubernetes取得了阶段性的胜利，但是否是绝对胜利，还要看K8S后续的成长，因为接下来K8S要面对的是，越来越多的企业用户开始在生产中大规模使用以及随之而来的集成复杂软件的挑战。但不管从哪方面讲，2018必将是Kubernetes之年。

时间回到2014年6月，[Docker 1.0发布][2]。从1.0开始我们使用Docker就不在会收到““Do not run in production!”的警告了。1.0代表着一个软件的成熟，可以用于生产环境了。但是尴尬的是，这个1.0只是Docker Engine, 而单一个Docker Engine并不能用于生产环境，生产环境的复杂性并不是一个两个容器能够解决的，是需要成百上千的容器，而这么多的容器，他们的管理需要有一个容器编排的工具，但是Docker公司并没有。值得肯定的是，Docker Engine作为一个开源免费的工具，确实给广大开发者带来了福音，极大的方便了软件的测试和部署，由此Docker也迎来了一批忠实的拥趸。

2014年中（个人猜测应该是6月），容器编排工具[Kubernetes诞生][3]，并迅速得到Google和RedHat的支持。2014年7月，[Docker收购Orchard Labs][4]，由此Docker公司开始涉足容器编排领域，Orchard Labs这家2013年由两位牛逼的年轻人创建的公司，有一个当时非常著名的容器[编排工具fig][5]，而这个fig就是docker-compose的前身。[Docker Compose][6]虽然能编排多容器的APP，但是却不能实现在多个机器上进行容器的创建和管理。所以此时Docker公司和Kubernetes并未开始正面竞争和冲突。

2015年初，Docker发布Swarm，开始追赶Kubernetes的脚步，正式进入容器编排领域。2015年7月，[Kubernetes 1.0发布][7]，标志着Kubernetes可以用于生产环境。 2015年11月，[Swarm 1.0发布][8]。Swarm开始了和Kubernetes的正面竞争。

2016年3月，[Docker公司写了一篇软文][9]，声称在各项benchmark中Swarm完胜Kubernetes。2016年6月，一个重要的导火索事件，[Docker在其1.12版本里内置集成了Swarm][10]，Swarm像Windows内置IE一样成了Docker默认的容器编排工具，这在容器编排生态圈里引发了轩然大波，从2016年7月底开始，Google Kubernetes布道师 Kelsey Hightower 和Docker的CTO Solomon Hykes在Twitter上发生了一场撕B大战。Docker公司的这种不正当竞争的做法引起了业界的强烈不满，大家纷纷开始站队，一场容器编排的战争一触即发。

2017年3月，[Docker公司宣布Docker企业版诞生][11]，自此开始区分社区版和企业版，从2016年到2017年初，Docker公司的一些列动作充分展示了一个创业公司的盈利压力。Docker公司的一系列努力，并没有能让Docker Swarm走上容器编排的巅峰，相反，Kubernetes因为其优秀的架构和健康的社区环境，得到迅速发展，在生产环境中得到了广泛的应用，然后用户反馈，社区回应，良性循环了下去。2017年各大厂商都开始拥抱Kubernetes，亚马逊AWS，Microsoft Azure，VMware， 有的甚至抛弃了自家的产品。于是乎就有了本文开头所写的2017年底，Docker宣布在自家企业版里支持Kubernetes，和Swarm一起作为容器编排的解决方案供用户选择。

纵观这段短短的历史，Docker成就了Kubernetes，其实反过来Docker也是受益者，毕竟在容器底层技术领域，Docker还是老大，Kubernetes底层更更多的还是选择使用containerd（工业标准的容器运行时，2016年从Docker Engine中剥离出并捐献给社区）。而对于我们学习者和使用者来讲，要学习Kubernetes之前必须要先深入了解Docker，当然如果能深入了解下Docker Swarm会更好，因为你会不自觉的去比较，看看Swarm和Kubernetes比，有哪些优点和缺点。

最后送给大家一句话，学习Docker和Kubernetes不能只看文档和教程，一定要动手实践，越多越好。



[1]: https://blog.docker.com/2017/10/docker-enterprise-edition-kubernetes/
[2]: https://blog.docker.com/2014/06/its-here-docker-1-0/
[3]: https://en.wikipedia.org/wiki/Kubernetes
[4]: https://www.infoq.com/news/2014/07/docker-acquires-orchard
[5]: http://www.fig.sh/
[6]: https://docs.docker.com/compose/
[7]: https://cloudplatform.googleblog.com/2015/07/Kubernetes-V1-Released.html
[8]: https://blog.docker.com/2015/11/swarm-1-0/
[9]: https://containerjournal.com/2016/03/17/docker-swarm-beats-google-kubernetes-container-cluster-orchestration/
[10]: https://blog.docker.com/2016/06/docker-1-12-built-in-orchestration/
[11]: https://blog.docker.com/2017/03/docker-enterprise-edition/