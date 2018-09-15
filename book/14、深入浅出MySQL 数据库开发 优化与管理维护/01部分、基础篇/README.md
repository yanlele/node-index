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
**1、创建数据库**               
  
`CREATE DATABASE dbname`              
然后可以输入： `show databases ;`可以查看已经创建的数据库                  

`use dbname`  选择具体的数据库                    
`show tables`  查看所有数据表                  


**2、删除数据库**                 

`drop database dbname` 就可以删除相对应的数据库了                          


**3、创建表**

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


**4、删除表**

`drop table if exists emp;`                   


**5、修改表**
column_definition 表示一个明确的字段定义 包括名字和属性

**5.1、修改表的类型**              

`alter table tablename MODIFY [COLUMN] column_definition [FIRST|AFTER col_name]`                     
例如 要修改emp表的ename字段的定义，想varchar(10)改为varchar(20);                    
`alter table emp modify ename varchar(20);`

**5.2、添加表字段**               

`alter table tablename ADD [COLUMN] column_definition [FIRST|AFTER col_name]`                   
例如 要给emp表加新字段age, 类型为int(3): `alter table emp add column age int(3);`                                   

**5.3、删除字段**

`alert table tablename DROP [COLUMN] col_name`              
例如我们要删除 age 字段 ： `alter table emp drop column age;`                 

**5.4、修改字段名**

`alter table tablename change [column] old_col_name column_definition [first|after col_name]`            
例如 把emp表的age改名为age1，同事修改字段类型为int(4):  `alter table emp change age age1 int(4);`             

**5.5、修改字段排列顺序**

添加介绍的 add/change/modify 中还有一个可选项 first|after column_name 这个可以修改字段在表的位置；                     
例如 add添加新字段默认在表的最后的位置， 比如添加birth data 在ename 之后： `alter table emp add birth date after ename;`              
例如 修改age，将他放在最近前: `alter table emp modify age int(3) first;`

**5.6、修改表名**

`alter table tablename rename [to] new_tablename`                   
例如 把emp改为emp1: `alter table emp rename emp1;`                       


#### DML语句
**1、插入语句**

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

**2、更新记录**                  

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

**3、删除记录**

`delete from tablename [where condition]`                   
例如 在emp中， 将ename为'dony'的记录全部删除： `delete from emp where ename='dony';`                   

同时删除多个表的数据（from后面的表要用别名，则delete后面的也要用相应的别名）：         
`delete t1, t2, ...tn from t1, t2,...tn [where condition];`                     
例如 同时删除emp和dept中deptno为3的记录： `delete a,b from emp a, dept b where a.deptno=b.deptno and a.deptno=3;`

**4、查询记录**

`select * from tablename [where condition];`                
例如 把所有记录都查出来： `select * from emp;`              
例如 用逗号分隔想要查询的数据： `select ename,sal,deptno from emp;`                

**4.1、查询不重复的记录：使用关键字`distinct`实现**                  
`select distinct deptno from emp;`

**4.2、多条件查询**
例如 查询所有deptno为2的记录： `select * from emp where deptno=2;`                     

多条件查询中，除了 = 还可以使用，>, <, >=, <=, != 等比较运算符号， 还可以使用and 和 or 等逻辑运算符：
例如 `select * from emp where deptno<=5 and sal>5000;`

**4.3、排序和限制**                   

`select * from tablename [where condition] [order by field1 [desc|asc], field2 [desc|asc], ... fieldn [desc|asc]];`                                          
asc 升序；desc 降序；默认是由低到高的排列； 如果排序字段值一样，则相同的字段按照第二个排列字段进行排序；                   

例如 emp表按照sal由低到高排序： 
```sql
select * from emp order by sal;
select * from emp order by sal asc;
```
例如 emp表按照sal 降序： `select * from emp order by sal desc;`             
例如 对于deptno相同的两条记录，可以按照工资降序排列： `select * from emp order by deptno, sal desc;`    

对于后面的记录，只希望查询一部分，而不是全部，可以用limit关键字来限制：                                    
`select ... [limit offset_start, row_count]`                             
如果offset_start偏移量为0 ，可以省略。                  
例如 查询emp表中对sal 排序后的钱三条： `select * from emp order by sal limit 3;`                   
例如 第二条开始，查询三条： `select * from emp order by sal limit 1,3;`                  


**4.4、聚合操作**

`select [field1, field2,... fieldn] fun_name from tablename [where where_contition] [group by field1, field2, ... fieldn [with rollup]] [having where_contition]`                   
参数说明：               
fun_name 表示要聚合操作， 也是聚合函数， 常用的有sum(求和)、count(*)（记录数）、max、min;                        
group my 表示要进行分类聚合的字段，比如按照部门分类统计员工数量，部门就应该写在group by 后面；                    
WITH ROLLUP 可选语法，表示是否对分类聚合后的结果进行在汇总；                    
HAVING 表示分类后的结果在进行条件的赛选

例如 要统计emp的总人数: `select count(1) from emp;`                  
例如 要在此基础上统计各个部门的人数： `select deptno,count(1) from emp group by deptno;`                  
例如 既要统计各个部门的人数，又要统计总人数： `select deptno,count(1) from emp group by deptno with rollup;`                  
例如 统计人数大于1的部门： `select deptno,count(1) from emp group by deptno having count(1)>1;`                     
例如 最后统计公司所有员工的薪水总额，最高薪水和最低薪水： `select sum(sal),max(sal),min(sal) from emp;`                         

**4.5、表连接**                 
当同事需要显示多个表的字段是，就要用到表连接。表连接分为：内连接和外链接。
区别：内连接仅选出两张表中相互匹配的记录；外链接会选出其他不匹配的记录。常用捏连接                   

例如 要查处所有的雇员名字和所在部门，员工在emp表，部门在dept表中： `select ename,deptname from emp,dept where emp.deptno=dept.deptno;`               

外链接又分为左连接和右连接
左连接： 包含所有左边表中的记录，甚至是右边表中没有和它匹配的记录                   
右连接： 包含所有左边表中的记录，甚至是左边表中没有和它匹配的记录                   
例如 查询emp中所有用户名和所在部门名称： 
```sql
select ename,deptname from emp left join dept on emp.deptno=dept.deptno;
select ename,deptname from dept right join emp on emp.deptno=dept.deptno;
select ename,deptname from dept right join emp on dept.deptno=emp.deptno;
```                  
上面三种查询费结果都是一样的。                 

**4.6、子查询**                     
如果需要的条件是另外一个select语句的结果，就要用到子查询。                    
关键字： `in、not in、=、!=、exists、not exists`等                            

例如 从emp 中查询出所有部门在dept中的所有记录： `select * from emp where deptno in(select deptno from dept);`                                    

如果子查询记录数唯一，可以用 = 代替 in:                     
例如 `select * from emp where deptno =(select deptno from dept);`会报错，以为select deptno from dept 查询出来的deptno不止一个；                                          
例如 `select * from emp where deptno =(select deptno from dept limit 1);` 就不报错了；                  

例如 子查询可以转为表连接查询： 
```sql
select emp.*,dept.* from emp, dept where emp.deptno=dept.deptno;
select emp.* from emp, dept where emp.deptno=dept.deptno;
select dept.* from emp, dept where emp.deptno=dept.deptno;
select ename,deptname from emp, dept where emp.deptno=dept.deptno;
select emp.* from emp, dept where emp.deptno=dept.deptno;
select emp.*, deptname from emp, dept where emp.deptno=dept.deptno;
select emp.*, dept.deptname from emp, dept where emp.deptno=dept.deptno;
```

**4.7、记录联合**                    

将两个表按照一定的查询条件查询出来之后，要把结果联合并到一起现实出来 关键词 **union 和 union all**                        
`select * from t1 union|union all select * from t2 ...... union|union all select * from tn;`

union all 是把结果合并到在一起；                   
union 是将union all后的记过进行了以此distinct,去重处理；            
例如 将emp和dept中部门编号联合起来现实：             
```sql
select deptno from emp union all select deptno from dept;
select deptno from emp union select deptno from dept;
```

#### DCL语句
例如 创建一个yanle数据库用户，对于sakila数据库中所有的表 select/insert 权限：                                   
```sql
grant select, insert on sakila.* to 'yanle'@'localhost' identified by '123456';
```

例如 收回权限
```sql
revoke insert on sakila.* from 'yanle'@'localhost';
revoke select on sakila.* from 'yanle'@'localhost';
```
















