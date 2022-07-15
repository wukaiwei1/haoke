import request from '@/utils/request'

// 登录接口
export const login = (username, password) => {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { username, password }
  })
}
// 获取用户信息
export const userInfo = (token) => {
  return request({
    url: '/user',
    headers: {
      authorization: token
    }
  })
}
// 获取收藏列表
export const favorites = (token) => {
  return request({
    url: '/user/favorites',
    headers: {
      authorization: token
    }
  })
}
