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