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
