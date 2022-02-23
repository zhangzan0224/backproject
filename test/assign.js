const o1 = { a: 1 }
const o2 = { b: 2 }
const o3 = { c: 3, d: [{ e: 1, f: { g: 3 } }] }

const obj = Object.assign(o1, o2, o3)
console.log(obj) // { a: 1, b: 2, c: 3 }
console.log(o1) // { a: 1, b: 2, c: 3 }, 注意目标对象自身也会改变。
