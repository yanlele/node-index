h = 100;
s = 100;
n = 1;

while (s < 690) {
    h = 3/4 * h;
    s = s + 2 * h;
    n++;
}
console.log(n - 1);