const fs = require('fs');

const promisify = require('util').promisify;

const read = promisify(fs.readFile);

/*read('./01、readFile.js').then(data => {
    console.log(data)
}).catch(ex => {
    console.log(ex)
})*/

async function test() {
    try {
        const content = await read('./01、readFile.js');
        console.log(content.toString())
    }catch(err){
        console.log(err)
    }

}

test();