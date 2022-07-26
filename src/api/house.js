import request from '@/utils/request'
// 获取房屋具体信息
export const getHouse = (code) => {
  return request({
    url: `/houses/${code}`
  })
}
// 房屋是否被收藏
// /user/favorites/{id}
export const isAddHouse = (code) => {
  return request({
    url: `/user/favorites/${code}`
  })
}

//  添加收藏
// /user/favorites/{id}
export const addHouse = (code) => {
  return request({
    url: `/user/favorites/${code}`,
    method: 'POST'
  })
}
// 删除收藏
export const removeHouse = (code) => {
  return request({
    url: `/user/favorites/${code}`,
    method: 'DELETE'
  })
}

// 发布房屋需要的条件

export const setHouseInfo = () => {
  return request({
    url: '/houses/params'
  })
}
