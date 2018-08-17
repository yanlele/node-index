import base from './css/base.less'
import {a} from './common/util';

var htmlApp = document.getElementById('app');
htmlApp.innerHTML = '<div class="'+ base.box + '"></div>';

console.log(a());

import {chunk} from 'lodash';
console.log(chunk([1,2,3,4,5,6,7], 2));

