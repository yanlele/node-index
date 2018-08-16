import * as _ from 'lodash';
console.log(_.chunk([1,2,3,4,5,6,7],2));


const NUM = 5;

interface Cat {
    name: String,
    gender: String
}

function touchCat (cat: Cat) {
    console.log('miao~~~~ ', cat.name)
}

touchCat({
    name: 'tom',
    gender: 'mail'
});