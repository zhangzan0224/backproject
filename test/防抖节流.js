// 节流
// function throttled (func, delay) {
//   let timer = null
//   const startTime = Date.now()
//   return function () {
//     const curTime = Date.now()
//     const remainingTime = delay - (curTime - startTime)
//     const context = this
//     const args = arguments
//     clearTimeout(timer)
//     if (remainingTime <= 0) {
//       func.apply(context, args)
//       startTime = Date.now()
//     } else {
//       timer = setTimeout(func, remainingTime)
//     }
//   }
// }

// 节流

function debounce(func, wait, immediate) {
  let timeout
  return function () {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callnow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait)
      if (callnow) {
        func.apply(context, args)
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}

function debounce(func, wait, immediate) {
  let timer
  return function () {
    let context = this
    let args = arguments
    //如果存在timer则清空，那就不执行下面的函数
    if (timer) clearTimeout(timer) // timer 不为null

    if (immediate) {
      let callnow = !timer
      timer = setTimeout(function () {
        timer = null
      }, wait)
      if (callnow) {
        func.apply(context, args)
      }
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }
}
