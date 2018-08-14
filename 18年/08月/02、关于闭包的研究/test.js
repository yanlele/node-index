function f(){
    var a=[];
    var i;
    for(i=0;i<3;i++){
        a[i]=(function(x){
            return function(){
                return x;
            }
        })(i);
    }
    return a;
}
var test=f();
console.log(test[0]());
console.log(test[1]());
console.log(test[2]());