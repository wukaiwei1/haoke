import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  // 用户页面
  {
    path: '/layout',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'my',
        component: () => import('@/views/layout/user.vue')
      },
      {
        path: 'hunting',
        component: () => import('@/views/layout/hunting.vue')
      },
      {
        path: 'zixun',
        component: () => import('@/views/layout/zixun.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/layout/home.vue')
      }
    ]
  },
  // 收藏页面
  {
    path: '/favorites',
    component: () => import('@/views/layout/favorites/favorites.vue')
  },
  // 收藏详情页
  {
    path: '/house',
    component: () => import('@/views/layout/favorites/house.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
