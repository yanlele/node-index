const page = new Map();
page.set('name', 'yanle');

console.log(page.get('name'));
console.log(page.keys());


const pages = {
    name: 'yanle',
    age: 27
};
for (const key in pages) {
    console.log(key);
}
