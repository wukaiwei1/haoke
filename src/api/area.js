import request from '@/utils/request'

// 获取城市列表数据
export const getCity = (number) => {
  return request({
    url: '/area/city',
    params: {
      level: number
    }
  })
}

// /area/hot
// 获取热门城市列表数据
export const getHotCity = () => {
  return request({
    url: '/area/hot'
  })
}

// 搜索小区关键
export const getCommunity = (name, id) => {
  return request({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
}
