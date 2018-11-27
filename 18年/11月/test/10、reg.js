/**
 * create by yanlele
 * create time 2018-11-27 10:57
 */


let reg = /.com/;

let result = reg.exec('yanle.com');


for (let key in result) {
    console.log(key);
    console.log(result[key]);
    console.log('==================');
}