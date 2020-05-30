import request from './index'

export function getImgDetailData(id) {
  return request({
    url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
  })
}