import Vue from 'vue'
import Vuex from 'vuex'
import { GetToken, SetToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 房屋的code
    houseCode: '',
    // token
    token: GetToken() || ''
  },
  // getters: {},
  mutations: {
    // 获取房屋code值方法
    getCode(state, payload) {
      state.houseCode = payload
    },
    // token 方法
    setUser(state, payload) {
      // console.log(payload)
      state.token = payload
      SetToken(payload)
    }
  }
  // actions: {},
  // modules: {}
})
