async function async1 () {
  console.log('async1 start') // 2
  await async2()
  console.log('async1 end') // 6
}

async function async2 () {
  console.log('async2') // 3
}

console.log('script start') // 1

setTimeout(function () {
  console.log('setTimeout') // 8
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1') // 4
  resolve()
}).then(function () {
  console.log('promise2') // 7
})

console.log('script end') // 5

const timer = setTimeout(() => {
  console.log(111)
}, 500)
clearTimeout(timer)
setTimeout(() => {
  console.log('@@@', !timer)
}, 1000)
var result =
  100 + true + 21.2 + null + undefined + 'Tencent' + [] + null + 9 + false
console.log(result)
var num = 5
var a = (5 && ++num && 7 > 8) || 8 > 7 || !9
console.log(a)
// function foo() {
//   console.log(2)
// }
// var foo
// foo()
// foo = function () {
//   console.log(1)
// }
// foo()
// foo()
var foo = []
foo.push(1)
foo.push(2)
console.log('@', foo.length)
