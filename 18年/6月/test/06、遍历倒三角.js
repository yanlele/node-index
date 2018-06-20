let a = 5;          //总共五行
for (let i = a; i >= 1; i--) {
    for (let m = 1; m <= a - i; m++) {
        process.stdout.write(" ");
    }
    for (let j = 0; j < 2 * i - 1; j++) {
        process.stdout.write("*");
    }
    console.log()   //换行
}

for (let x = 1; x <= 5; x++) {
    for (let z = 1; z < x; z++) {
        process.stdout.write(" ");
    }
    for (let y = x; y <= 5; y++) {
        process.stdout.write("*");
    }
    console.log()   //换行
}