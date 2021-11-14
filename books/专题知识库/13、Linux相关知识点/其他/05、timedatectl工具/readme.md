## timedatectl

timedatectl命令对于RHEL / CentOS 7和基于Fedora 21+的分布式系统来说，是一个新工具，它作为systemd系统和服务管理器的一部分，代替旧的传统的用在基于Linux分布式系统的sysvinit守护进程的date命令。

命令 | 功能
:- | :-
`timedatectl status` |显示系统的当前时间和日期
`timedatectl` 或者 `timedatectl | grep Time` | Linux系统上的time总是通过系统上的timezone设置的，要查看当前时区
`timedatectl list-timezones` | 查看所有可用的时区
`timedatectl list-timezones | egrep -o ‘’Asia/B.*”` | 根据地理位置找到本地的时区
`timedatectl set-timezone "Asia/Shanghai"` | 要在Linux中设置本地时区，使用set-timezone开关
`timedatectl set-timezone UTC` | 推荐使用和设置协调世界时，即UTC。
`timedatectl set-time 15:58:30` | 设置Linux中的时间
`timedatectl set-time 20151120` | 在Linux中设置日期
`timedatectl set-time '16:10:40 2015-11-20'` | 设置日期和时间
`timedatectl | grep local` | 首先确定你的硬件时钟是否设置为本地时区
`imedatectl set-local-rtc 1`| 硬件时钟设置为本地时区
`timedatectl set-local-rtc 0` | 件时钟设置为协调世界时（UTC）
