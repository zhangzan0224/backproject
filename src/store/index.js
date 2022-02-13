import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 二三级菜单
    secondAndThirdMenu: JSON.parse(localStorage.getItem('menu')) || []
  },
  mutations: {
    SET_SECOND_AND_THIRD_MENU (state, secondAndThirdMenu) {
      // console.log(secondAndThirdMenu)
      state.secondAndThirdMenu = secondAndThirdMenu
      localStorage.setItem('menu', JSON.stringify(state.secondAndThirdMenu))
    }
  },
  actions: {},
  modules: {}
})
