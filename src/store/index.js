import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import mutations from './mutations'
import actions from './actions'
import state from './state'
import getters from './getters'
Vue.use(Vuex)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
