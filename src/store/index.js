import Vue from 'vue'
import Vuex from 'vuex'
import { GetToken, SetToken } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 房屋的code
    houseCode: '',
    // token
    token: GetToken() || '',
    // // 拿到点击城市名字
    cityName: '' || {
      label: '北京',
      pinyin: 'beijing',
      short: 'bj',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    // 小区数据
    Community: ''
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
    },
    // 获取城市名字
    setCityName(state, payload) {
      state.cityName = payload
    },
    // 获取小区名字
    setCommunityName(state, payload) {
      state.Community = payload
    }
  }
  // actions: {},
  // modules: {}
})
