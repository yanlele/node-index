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
create table emp(
  ename varchar(10),
  hiredate date,
  sal decimal(10,2),
  deptno int(2)
);
```
`desc emp;`  可以查看表的定义                   
`show create table emp;`  可以查看更加全面的具体sql语句信息    


4、删除表

`drop table emp;`                   


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











