let myObject = (function(){
    let name = 'yanle';
    return {
        getName: function(){
            return name;
        }
    }
})();

console.log(myObject.name);
console.log(myObject.getName());