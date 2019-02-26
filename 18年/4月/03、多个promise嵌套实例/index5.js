console.log(1);
const function1 = function () {
    return new Promise((resolve) => {
        console.log(2);
        resolve(3);
    });
};
function1().then(function (res) {
    console.log(res);
});
console.log(4);
