var MobileDetect = require('mobile-detect');

var md = new MobileDetect(
  'Mozilla/5.0 (Linux; U; Android 4.0.3; en-in; SonyEricssonMT11i' +
  ' Build/4.1.A.0.562) AppleWebKit/534.30 (KHTML, like Gecko)' +
  ' Version/4.0 Mobile Safari/534.30');

// more typically we would instantiate with 'window.navigator.userAgent'
// as user-agent; this string literal is only for better understanding

console.log(md.mobile());          // 'Sony'
console.log(md.phone());           // 'Sony'
console.log(md.tablet());          // null
console.log(md.userAgent());       // 'Safari'
console.log(md.os());              // 'AndroidOS'
console.log(md.is('iPhone'));      // false
console.log(md.is('bot'));         // false
console.log(md.version('Webkit'));         // 534.3
console.log(md.versionStr('Build'));       // '4.1.A.0.562'
console.log(md.match('playstation|xbox')); // false
console.log(md);
