let stringText = '152941063221O5mSm12J';


/*
console.log(stringText.substr(0,4) + ' **** ' + stringText.substr(stringText.length -4, 4));
console.log(stringText);*/

console.log(stringText.replace(/^(\w{4})\w*\w{4}$/), 123);