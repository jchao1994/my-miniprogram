import request from './index'

export function getAlbumDetailData(id, data) {
  return request({
    url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${id}/wallpaper`,
    data
  })
}