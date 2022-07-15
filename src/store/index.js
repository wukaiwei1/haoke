import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 房屋的code
    houseCode: ''
  },
  // getters: {},
  mutations: {
    getCode(state, payload) {
      payload.desc = payload.desc.split('/')
      state.houseCode = payload
    }
  },
  actions: {},
  modules: {}
})
