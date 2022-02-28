// 导入api
import $api from '@/apis'

export const state = {
  // 搜索参数
  deptId: null,
  deptIds: []
}
export const getters = {}
export const mutations = {
  SET_USER_DEPT_ID (state, deptId) {
    state.deptId = deptId
  },
  SET_USER_DEPT_IDS (state, deptIds) {
    state.deptIds = deptIds
  }
}
export const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
