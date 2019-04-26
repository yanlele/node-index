const str = '        sdljakdv, \n \n sdkfjskdfad         ';

console.log(str.replace(/\s/g, ''));
console.log(str.replace(
    /(^\s*)|(\s*$)/g,
    '',
));
