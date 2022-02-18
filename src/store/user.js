import Vue from 'vue'
import Vuex from 'vuex'

// 导入api
import $api from '@/apis'
Vue.use(Vuex)

export const state = {
  // 搜索参数
  searchParams: {
    blurry: '', // 模糊的
    'createTime[0].date': undefined,
    'createTime[0].day': undefined,
    'createTime[0].hours': undefined,
    'createTime[0].minutes': undefined,
    'createTime[0].month': undefined,
    'createTime[0].nanos': undefined,
    'createTime[0].seconds': undefined,
    'createTime[0].time': undefined,
    'createTime[0].timezoneOffset': undefined,
    'createTime[0].year': undefined,
    deptId: undefined,
    deptIds: [],
    enabled: undefined,
    id: undefined,
    page: 0,
    size: 10,
    sort: ['id,asc']
  },
  // 用户列表
  usersList: [],
  // 用户列表总数
  total: 1
}
export const getters = {}
export const mutations = {
  GET_USERS_LIST (state, usersList) {
    state.usersList = usersList
  },
  GET_USERS_LIST_COUNT (state, total) {
    state.total = total
  }
}
export const actions = {
  async getUsersList ({ commit }, val) {
    const result = await $api.users.reqGetUsersList(val)
    // console.log(result)
    commit('GET_USERS_LIST', result.content)
    commit('GET_USERS_LIST_COUNT', result.totalElements)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
