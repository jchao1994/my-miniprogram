import request from './index'

export function getVideoRecommendData(data) {
  return request({
    url: 'http://157.122.54.189:9088/videoimg/v1/videowp/featured',
    data
  })
}

export function getVideoEntertainmentData(data) {
  return request({
    url: 'http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a',
    data
  })
}

export function getVideoNewOrHotData(data) {
  return request({
    url: 'http://157.122.54.189:9088/videoimg/v1/videowp/videowp',
    data
  })
}