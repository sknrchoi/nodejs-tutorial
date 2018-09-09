var _ = require('underscore');
var array = [1,2,3,4,5];

console.log('첫번째 요소 : ' + array[0]);
console.log('첫번째 요소 : ' + _.first(array));

console.log('마지막 요소 : ' + array[array.length -1]);
console.log('마지막 요소 : ' + _.last(array));