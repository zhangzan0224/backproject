import Layout from '@/views/Layout';
// 将后台返回的路由数据得重新处理下
export const rebulidMenu = (arr) => {
  if (!arr.length) return [];
  arr.forEach((element) => {
    if (element?.component === 'Layout') {
      element.component = Layout;
    } else {
      //
      element.component = loadView(element.component);
    }
    if (element.children?.length) {
      rebulidMenu(element.children);
    }
  });
  return arr;
};

// function setComponetValue (val) {
//   // console.log('@/views/' + val);
//   return () => import('@/views/' + val);
// }
// 使用require的方式
// function setComponetValue (path) {
//   // console.log(path);
//   return (resolve) => require([`@/views/${path}`], resolve);
// }
export const loadView = (view) => {
  // 路由懒加载
  // console.log(`@/views/${view}.vue`);
  return (resolve) => require([`@/views/${view}.vue`], resolve);
};
