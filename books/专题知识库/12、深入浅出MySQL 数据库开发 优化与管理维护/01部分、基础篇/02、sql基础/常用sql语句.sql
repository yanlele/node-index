/*常用DDL语句*/
# 创建库
create database test;

# 选择库
use test;

# 创建表
create table if not exists emp(
  ename varchar(10),
  hiredate date,
  sal decimal(10,2),
  deptno int(2)
);

# 查看表
desc emp;

# 查看建表详情
show create table emp;

# 删除表
drop table if exists emp;

# 修改表的类型
alter table emp modify ename varchar(20);

# 添加新字段
alter table emp add column age int(3);

# 删除字段
alter table emp drop column age;

# emp表的age改名为age1，同时修改字段类型为int(4)
alter table emp change age age1 int(4);

# add添加新字段默认在表的最后的位置， 比如添加birth data 在ename 之后
alter table emp add birth date after ename;

# 修改age，将他放在最近前
alter table emp modify age int(3) first;

# 把emp改为emp1
alter table emp rename emp1;


/*常用DML语句*/
# 我们向emp中插入一条数据
insert into emp (ename, hiredate, sal, deptno) values ('yanle', '2018-08-01', '10000', 1);

# 可以不指定字段名称，但是后面 values 后面的顺序应该和字段是一样的排列
insert into emp values ('lele', '2018-08-01', '10000', '2');

# 只对ename和sal字段实现插入值
insert into emp (ename, sal) values ('dony', 7000);

# 查看实际插入的值
select * from emp;

# 对emp表一次性插入两条数据
insert into emp (ename, hiredate, sal, deptno)
values
       ('yanle3', '2018-08-01', '10000', 3),
       ('yanle4', '2018-09-15', '1000', 4);

# 把dony的sal 从7000 改为 4000
update emp set sal=4000 where ename='dony';

# 同时更新emp表中的sal字段和dept表中deptname字段的数据：
create table if not exists dept(
  deptno int(3),
  deptname varchar(10)
);
insert into dept(deptno, deptname)
VALUES
       (1, 'tech'),
       (2, 'sale'),
       (5, 'fin');
select * from dept;
update emp, dept set emp.sal=emp.sal * dept.deptno, dept.deptname=emp.ename where emp.deptno=dept.deptno;
update emp a, dept b set a.sal=a.sal * b.deptno, b.deptname=a.ename where a.deptno=b.deptno;

# 在emp中，将ename为'dony'的记录全部删除
delete from emp where ename='dony';

# 同时删除emp和dept中deptno为3的记录
insert into dept(deptno, deptname) values (3, 'lelelelele');
delete a,b from emp a, dept b where a.deptno=b.deptno and a.deptno=3;

# 包所有记录都查询出来
select * from emp;

# 用逗号分隔想要查询的数据
select ename,sal,deptno from emp;

# 查询不重复的记录
insert into emp(ename, hiredate, sal, deptno)
values
       ('dupeng', '2018-09-09', 9000, 2);
select distinct deptno from emp;

# 查询所有deptno为2的记录
select * from emp where deptno=2;

# 多条件查询
select * from emp where deptno<=5 and sal>5000;

# emp表按照sal由低到高排序
select * from emp order by sal;
select * from emp order by sal asc;

# emp表按照sal 降序
select * from emp order by sal desc;

# 对于deptno相同的两条记录，可以按照工资降序排列
select * from emp order by deptno, sal desc;

# 查询emp表中对sal 排序后的钱三条
select * from emp order by sal limit 3;

# 第二条开始，查询三条
select * from emp order by sal limit 1,3;

# 要统计emp的总人数
select count(1) from emp;

# 要在此基础上统计各个部门的人数
select deptno,count(1) from emp group by deptno;

# 既要统计各个部门的人数，又要统计总人数
select deptno,count(1) from emp group by deptno with rollup;

# 统计人数大于1的部门
select deptno,count(1) from emp group by deptno having count(1)>1;

# 最后统计公司所有员工的薪水总额，最高薪水和最低薪水
select sum(sal),max(sal),min(sal) from emp;

# 要查处所有的雇员名字和所在部门，员工在emp表，部门在dept表中
update dept set deptname='技术组' where deptno=1;
update dept set deptname='销售组' where deptno=2;
update dept set deptname='人事部' where deptno=3;
select * from dept;
select * from emp;
select ename,deptname from emp,dept where emp.deptno=dept.deptno;

# 查询emp中所有用户名和所在部门名称 左连接
insert into emp(ename, hiredate, sal, deptno)
values ('dony', '2018-09-09', 4500, 4);
select ename,deptname from emp left join dept on emp.deptno=dept.deptno;
select ename,deptname from dept right join emp on emp.deptno=dept.deptno;
select ename,deptname from dept right join emp on dept.deptno=emp.deptno;

# 查询dept中所有部门和用户所在部门的人名 右连接方式来做
select ename,deptname from emp right join dept on emp.deptno=dept.deptno;

# 从emp 中查询出所有部门在dept中的所有记录
select * from emp where deptno in(select deptno from dept);

# 如果子查询记录数唯一，可以用 = 代替 in
select * from emp where deptno =(select deptno from dept);  # 会报错，以为select deptno from dept 查询出来的deptno不止一个；
select * from emp where deptno =(select deptno from dept limit 1);

# 子查询可以转为表连接查询
select emp.*,dept.* from emp, dept where emp.deptno=dept.deptno;
select emp.* from emp, dept where emp.deptno=dept.deptno;
select dept.* from emp, dept where emp.deptno=dept.deptno;
select ename,deptname from emp, dept where emp.deptno=dept.deptno;
select emp.* from emp, dept where emp.deptno=dept.deptno;
select emp.*, deptname from emp, dept where emp.deptno=dept.deptno;
select emp.*, dept.deptname from emp, dept where emp.deptno=dept.deptno;

# 将emp和dept中部门编号联合起来现实
select deptno from emp union all select deptno from dept;
select deptno from emp union select deptno from dept;


/*DCL语句*/
# 创建一个yanle数据库用户，对于sakila数据库中所有的表 select/insert 权限
grant select, insert on sakila.* to 'yanle'@'localhost' identified by '123456';

# 如果要收回insert权限，只给select权限
revoke insert on sakila.* from 'yanle'@'localhost';
revoke select on sakila.* from 'yanle'@'localhost';
