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
