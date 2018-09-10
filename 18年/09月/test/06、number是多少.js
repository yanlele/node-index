/*
var number = 1;
var obj = {
    number: 2,
    show: function () {
        this.number = 3;
        (function () {
            console.log(this.number)
        })();
        console.log(this.number)
    }
};
obj.show();*/

var number = 1;
(function () {
    console.log(this.number)
})();