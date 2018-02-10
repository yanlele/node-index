const {argv,argv0,execArgv,execPath}=process;

/*启动相关进程信息，同事还能获取参数*/
argv.forEach(item=>{
    console.log(item)
});

/*argv0保存了第一个argv对象的引用*/
console.log(argv0);

/*execArgv,获取文件名之前传递的参数*/
console.log(execArgv);

/*execPath调用脚本执行的参数*/
console.log(execPath);
