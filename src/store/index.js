import Vue from 'vue'
import Vuex from 'vuex'
import { reqAuthCode, reqAuthLogin } from '@/apis'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 随机验证码图片
    authCode: {},
    // token
    token: window.localStorage.getItem('token') || ''
  },
  mutations: {
    GET_AUTH_CODE (state, autoCode) {
      state.authCode = autoCode
    },
    GET_AUTH_LOGIN (state, token) {
      state.token = token
      window.localStorage.setItem('token', token)
    }
  },
  actions: {
    // 获取验证码图片信息
    async getAuthCode ({ commit }) {
      const result = await reqAuthCode()
      // console.log(result)
      if (result.status === 200) {
        commit('GET_AUTH_CODE', result.data)
      }
    },
    // 获取登录的信息
    async getAuthLogin ({ commit }, authLogindata) {
      try {
        const result = await reqAuthLogin(authLogindata)
        // console.log(result)
        if (result.status === 200) {
          commit('GET_AUTH_LOGIN', result.data.token)
          return 'ok'
        }
      } catch (error) {
        // console.log(error.response.data.message)
        return Promise.reject(error.response.data.message)
      }
    }
  },
  modules: {}
})
