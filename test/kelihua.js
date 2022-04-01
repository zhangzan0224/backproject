/* function add (a, b, c) {
  return a + b + c;
}

function curry (fn, ...args) {
  // 判断fn的参数是否
  console.log('@', args);
  if (args.length >= fn.length) {
    return fn(...args);
  }
  return function (...rest) {
    return curry(fn, ...args, ...rest);
  };
}

const sum = curry(add);

console.log(sum(2, 3, 4)); */

function sum (a, b, c) {
  return a + b + c;
}

function curry (fn) {
  return function curried (...arg1) {
    if (arg1.length >= fn.length) {
      // console.log(this);
      return fn.apply(this, arg1);
    }
    return function (...arg2) {
      console.log('arg1', arg1);
      console.log('arg2', arg2);
      return curried.apply(this, arg1.concat(arg2));
    };
  };
}
const myCurry = curry(sum);

console.log(myCurry(1)(2)(3));
// console.log(myCurry(1)(2, 3));
// console.log(myCurry(1, 2, 3));
