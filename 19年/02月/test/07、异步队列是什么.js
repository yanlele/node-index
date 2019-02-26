

console.log(1);

for (var i = 0; i<1000000000;i++) {

}

setTimeout(function () {
    console.log(2);
});

console.log(3);
