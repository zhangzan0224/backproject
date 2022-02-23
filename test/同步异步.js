/**
 * 同步代码
 * global begin
  foo begin
  bar begin
  global end
 */
/* console.log('global begin')

function bar () {
  console.log('bar begin')
}

function foo () {
  console.log('foo begin')
  bar()
}

foo()

console.log('global end') */

console.log('global begin')

setTimeout(function timer1 () {
  console.log('timer1 invoke')
}, 1800)

setTimeout(function timer2 () {
  console.log('timer2 invoke')
  setTimeout(function timer3 () {
    console.log('timer3 invoke')
  }, 1000)
}, 1000)
console.log('global end')
