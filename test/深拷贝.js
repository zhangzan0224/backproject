// function deepCopy (newObj, oldBoj) {
//   for (const key in oldBoj) {
//     // 获取属性值oldBoj[key]
//     const item = oldBoj[key];
//     if (item instanceof Array) {
//       newObj[key] = [];
//       deepCopy(newObj[key], item);
//     } else if (item instanceof Object) {
//       newObj[key] = {};
//       deepCopy(newObj[key], item);
//     } else {
//       // 简单类型
//       newObj[key] = item;
//     }
//   }
// }

// const obj1 = {
//   name: 'qianguyihao',
//   age: 28,
//   info: {
//     desc: 'hello'
//   },
//   color: ['red', 'blue', 'green']
// };
// const obj2 = {};
// deepCopy(obj2, obj1);
// console.log(obj2);
// obj1.info.desc = 'github';
// console.log(obj2);

function deepClone(newVal, oldVal) {
  for (const key in oldVal) {
    const item = oldVal[key];
    if (item instanceof Array) {
      newVal[key] = [];
      deepClone(newVal[key], item);
    } else if (item instanceof Object) {
      newVal[key] = {};
      deepClone(newVal[key], item);
    } else {
      newVal[key] = item;
    }
  }
}
const obj1 = {
  name: 'qianguyihao',
  age: 28,
  info: {
    desc: 'hello'
  },
  color: ['red', 'blue', 'green']
};
const obj2 = {};
deepClone(obj2, obj1);
console.log(obj2);
obj1.info.desc = 'github';
console.log(obj1);

function deepClone(newVal, oldVal) {
  for (let key in oldVal) {
    let item = oldVal[key];
    if (item instanceof Array) {
      newVal[key] = [];
      deepClone(newVal[key], item);
    } else if (item instanceof Object) {
      newVal[key] = {};
      deepClone(newVal[key], item);
    } else {
      newVal[key] = item;
    }
  }
}
