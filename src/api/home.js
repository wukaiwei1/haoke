import request from '@/utils/request'

// 首位轮播图
export const slideshow = () => {
  return request({
    url: '/home/swiper'
  })
}
// 租房小组
export const groups = () => {
  return request({
    url: '/home/groups'
  })
}

// 根据条件查询房源
/**
 *
 * @param {String} cityId  地区的id
 * @param {String} area    地区
 * @param {String} subway  地铁
 * @param {String} rentType 租房方式
 * @param {String} price    金额
 * @param {String} more     复合查询
 * @param {String} start    开始项
 * @param {String} end      结束项
 * @returns promise
 */
export const getAllhouse = (
  cityId,
  area,
  subway,
  rentType,
  price,
  more,
  start,
  end
) => {
  return request({
    url: '/houses',
    params: {
      cityId,
      area,
      subway,
      rentType,
      price,
      more
    }
  })
}

// 获取房屋查询条件
/**
 *
 * @param {String} id 查询城市ID
 * @returns promise
 */
export const getHouseCondition = (id) => {
  return request({
    url: '/houses/condition',
    params: {
      id
    }
  })
}
