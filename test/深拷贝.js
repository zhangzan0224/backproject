function deepCopy (newObj, oldBoj) {
  for (const key in oldBoj) {
    // 获取属性值oldBoj[key]
    const item = oldBoj[key]
    if (item instanceof Array) {
      newObj[key] = []
      deepCopy(newObj[key], item)
    } else if (item instanceof Object) {
      newObj[key] = {}
      deepCopy(newObj[key], item)
    } else {
      // 简单类型
      newObj[key] = item
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
}
const obj2 = {}
deepCopy(obj2, obj1)
console.log(obj2)
obj1.info.desc = 'github'
console.log(obj2)
