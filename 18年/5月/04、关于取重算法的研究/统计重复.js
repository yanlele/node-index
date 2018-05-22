function parseArr(arr){
    var nameArr=[];
    var result=[]
    arr.forEach(function(item){
        var i
        if((i=nameArr.indexOf(item.name))>-1){
            console.log(result,i)
            result[i].number=Number(result[i].number)+Number(item.number);
        }else{
            nameArr.push(item.name);
            result.push({
                name:item.name,
                number:item.number
            })
        }
    })
    return result
}