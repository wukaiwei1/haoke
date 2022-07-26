import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入flex适配
import 'amfe-flexible'
// 引入字体图标
import '@/assets/font/iconfont.css'
// 引入地图模块
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak: '2uyN3SVDXW3U7BZ3gMv4T5gBtvYBm0B5'
  ak: 'YOUR_APP_KEY'
})
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
