// 输⼊ array = [1,5,2,3,2,5,4] 输出 [1, 5, 2, 3, 4]
/* function unique (array) {
  return Array.from(new Set(array));
}
const array = [1, 5, 2, 3, 2, 5, 4];
console.log(unique(array)); */

// console.log(1);
// setTimeout(function () {
// console.log(2);
// }, 0);
// new Promise((resolve) => {
// console.log(3);
// resolve();
// console.log(4);
// }).then(() => {
// console.log(5);
// });
// console.log(6);
// var name = 1;
function test () {
  var name = 2;
  console.log('1', this.name);

  return function inner () {
    console.log('2', name);
  };
}
test();
test()();

var b = {
  name: 3
};
b.test = test;
console.log(b.test);
b.test();

var c = b.test;
c();

new test();
