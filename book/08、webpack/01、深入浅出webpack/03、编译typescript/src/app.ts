import * as _ from 'lodash';

console.log(_.chunk([1, 2, 3, 4, 5], 2));
const NUM = 45;

interface Cat {
    name: String,
    render: String
}

function touchCat(cat: Cat) {
    console.log('miao~~', cat.name);
}

touchCat({
    name: 'tom',
    render: 'male'
});