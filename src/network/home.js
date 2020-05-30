import request from './index'

export function getRecommendData(data) {
  return request({
    url: 'http://157.122.54.189:9088/image/v3/homepage/vertical',
    data
  })
}

export function getCategoryData(data) {
  return request({
    url: 'http://157.122.54.189:9088/image/v1/vertical/category'
  })
}


export function getCategorySubsData(id, data) {
  return request({
    url: `http://157.122.54.189:9088/image/v1/vertical/category/${id}/vertical`,
    data
  })
}

export function getAlbumData(data) {
  return request({
    url: 'http://157.122.54.189:9088/image/v1/wallpaper/album',
    data
  })
}