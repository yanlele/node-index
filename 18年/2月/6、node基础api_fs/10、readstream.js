const fs=require('fs');

const rs=fs.createReadStream('./10、readstream.js');

rs.pipe(process.stdout);