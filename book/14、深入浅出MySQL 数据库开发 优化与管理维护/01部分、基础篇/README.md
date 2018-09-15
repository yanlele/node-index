## <div id="class01">第一部分、基础篇</div>

### <div id="class01-01">01章、mysql的安装与配置</div>
这个部分的东西太过于基础，直接看网上搜索的文章就可以了：
[mysql下载与安装问题整理](../../../18年/09月/02、mysql下载与安装问题整理/)



### <div id="class01-02">02章、sql基础</div>
#### sql语句分类
DDL： 数据定义语言 - create、drop、alter等                 
DML： 数据操作语句 - insert、delete、update、select等                
DCL： 数据控制语句 - grant、revoke等

#### DDL语句
1、创建数据库               
  
`CREATE DATABASE dbname`              
然后可以输入： `show databases ;`可以查看已经创建的数据库                  

`use dbname`  选择具体的数据库                    
`show tables`  查看所有数据表                  


2、删除数据库                 

`drop database dbname` 就可以删除相对应的数据库了                          


3、创建表

```Mysql
CREATE TABLE tablename (
    column_name_1 column_type1 constraints,
    column_name_2 column_type2 constraints,
    column_name_3 column_type3 constraints,
    ..............
    column_name_n column_typen constraints,
)
```
column_name是列的名字；column_type是列的数据类型；constraints是列的约束条件            
      
实例： 
```sql
create table if not exists emp(
  ename varchar(10),
  hiredate date,
  sal decimal(10,2),
  deptno int(2)
);
```
`desc emp;`  可以查看表的定义                   
`show create table emp;`  可以查看更加全面的具体sql语句信息    


4、删除表

`drop table if exists emp;`                   


5、修改表
column_definition 表示一个明确的字段定义 包括名字和属性

5.1、修改表的类型              

`alter table tablename MODIFY [COLUMN] column_definition [FIRST|AFTER col_name]`                     
例如 要修改emp表的ename字段的定义，想varchar(10)改为varchar(20);                    
`alter table emp modify ename varchar(20);`

5.2、添加表字段               

`alter table tablename ADD [COLUMN] column_definition [FIRST|AFTER col_name]`                   
例如 要给emp表加新字段age, 类型为int(3): `alter table emp add column age int(3);`                                   

5.3、删除字段

`alert table tablename DROP [COLUMN] col_name`              
例如我们要删除 age 字段 ： `alter table emp drop column age;`                 

5.4、修改字段名

`alter table tablename change [column] old_col_name column_definition [first|after col_name]`            
例如 把emp表的age改名为age1，同事修改字段类型为int(4):  `alter table emp change age age1 int(4);`             

5.5、修改字段排列顺序

添加介绍的 add/change/modify 中还有一个可选项 first|after column_name 这个可以修改字段在表的位置；                     
例如 add添加新字段默认在表的最后的位置， 比如添加birth data 在ename 之后： `alter table emp add birth date after ename;`              
例如 修改age，将他放在最近前: `alter table emp modify age int(3) first;`

5.6、修改表名

`alter table tablename rename [to] new_tablename`                   
例如 把emp改为emp1: `alter table emp rename emp1;`                       


#### DML语句
1、插入语句

`insert into tablename (field1, field2, ......, fieldn) values (value1, value2, ......, valuen);`               
例如 我们向emp中插入一条数据： `insert into emp (ename, hiredate, sal, deptno) values ('yanle', '2018-08-01', '10000', 1);`                                
例如 可以不指定字段名称，但是后面 values 后面的顺序应该和字段是一样的排列： `insert into emp values ('lele', '2018-08-01', '10000', '2');`                             
例如 只对ename和sal字段实现插入值： `insert into emp (ename, sal) values ('dony', 7000);`                                  
例如 查看实际插入的值： `select * from emp;`                   

一次性插入多个数据：              
```sql
insert into tablename (field1, field2, ......, fieldn)
 values 
 (record1_value1, record2_value2, ......, recordn_valuen),
 ..............
 (recordn_value1, recordn_value2, ......, recordn_valuen);
```
例如 对emp表一次性插入两条数据：
```sql
insert into emp (ename, hiredate, sal, deptno)
values
       ('yanle3', '2018-08-01', '10000', 3),
       ('yanle4', '2018-09-15', '1000', 4);
```

2、更新记录                  

`update tablename set field1=value1, field2=value2, .... fieldn=valuen [where condition]`
例如 把dony的sal 从7000 改为 4000： `update emp set sal=4000 where ename='dony';`

同时更新多个表中的数据：                
`update t1, t2,...... tn set t1.field1=expr1, t2.field2=expr2, ...... tn.fieldn=exprn [where condition]`                    
例如 同时更新emp表中的sal字段和dept表中deptname字段的数据：
```sql
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
```
上面最后两条插入语句执行的效果是一样的。只是最后一句语句添加了一个别名而已。                      

3、删除记录

`delete from tablename [where condition]`                   
例如 在emp中， 将ename为'dony'的记录全部删除： `delete from emp where ename='dony';`                   

同时删除多个表的数据（from后面的表要用别名，则delete后面的也要用相应的别名）：         
`delete t1, t2, ...tn from t1, t2,...tn [where condition];`                     
例如 同时删除emp和dept中deptno为3的记录： `delete a,b from emp a, dept b where a.deptno=b.deptno and a.deptno=3;`

4、查询记录

`select * from tablename [where condition];`                
例如 把所有记录都查出来： `select * from emp;`              
例如 用逗号分隔想要查询的数据： `select ename,sal,deptno from emp;`                

4.1、查询不重复的记录：使用关键字`distinct`实现                  
`select distinct deptno from emp;`

4.2、多条件查询
例如 查询所有deptno为2的记录： `select * from emp where deptno=2;`                     

多条件查询中，除了 = 还可以使用，>, <, >=, <=, != 等比较运算符号， 还可以使用and 和 or 等逻辑运算符：
例如 `select * from emp where deptno<=5 and sal>5000;`

4.3、排序和限制                   

`select * from tablename [where condition] [order by field1 [desc|asc], field2 [desc|asc], ... fieldn [desc|asc]];`                                          
asc 升序；desc 降序；默认是由低到高的排列； 如果排序字段值一样，则相同的字段按照第二个排列字段进行排序；                   

例如 emp表按照sal由低到高排序： 
```sql
select * from emp order by sal;
select * from emp order by sal asc;
```
例如 emp表按照sal 降序： `select * from emp order by sal desc;`                 















