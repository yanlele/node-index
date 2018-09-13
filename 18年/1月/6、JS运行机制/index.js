for (let i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i)
    }, 100)
}

for (var i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i)
    }, 100)
}