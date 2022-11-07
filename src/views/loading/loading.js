/* eslint-disable no-unused-vars */
import Vue from 'vue';
import loading from './index.vue';

//  使用vue的扩展方法
const $app = Vue.extend(loading);
const $load = new $app().$mount(document.createElement('div'));
// console.log('@', $load);
document.body.appendChild($load.$el);
export default {
  install (vm) {
    // console.log(vm);
    vm.prototype.$load = {
      show: (params) => {
        // console.log(params);
        Object.keys(params).forEach((key) => {
          $load[key] = params[key];
        });
        $load.visable = true;
      },
      hide: () => {
        $load.visable = false;
      }
    };
  }
};
