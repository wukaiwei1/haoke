import request from '@/utils/request'

// 图片上传
export const getHousePic = (file) => {
  return request({
    url: '/houses/image',
    method: 'POST',
    data: file
  })
}
