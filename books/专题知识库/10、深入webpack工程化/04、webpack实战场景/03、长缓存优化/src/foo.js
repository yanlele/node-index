import react from 'react';
import module from './modules';

import('./async').then(function (a) {
    console.log(a)
});

console.log('hello world!!!');