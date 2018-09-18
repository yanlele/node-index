let a,b,c,d;
// a+b+c === d;
// a+b === c;
// b>=a;
let num = mycars = [1,2,3,4,5,6,7,8,9];
num.sort(function(a, b){
    return 0.5 - Math.random()
});

function getRandom() {
    return Math.ceil(Math.random()*1000000000%9);
}

function myMath() {
    a = getRandom();
    b = parseInt(Math.random() * 10);
    c = parseInt(Math.random() * 10);
    d = parseInt(Math.random() * 10);

    if(a+b+c === d) {
        if(a+b === c) {
            if(b>=a) {
                return [a,b,c,d]
            }
            return myMath();
        }
        return myMath()
    }
    return myMath();
}

let arr = []
for (let i = 0 ;i<=10;i++ ) {
    console.log(myMath());
    arr.map(function (item) {
        if(item !== myMath()) {
            arr.push(myMath())
        }
    })
}