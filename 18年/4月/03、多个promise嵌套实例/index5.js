const function1 = function () {
    return new Promise((resolve) => {
        // setTimeout(function () {
        //     console.log(5);
        // }, 0);
        console.log(2);
        resolve(3);
    });
};

console.log(1);

function1().then(function (res) {
    console.log(res);
});
console.log(4);
