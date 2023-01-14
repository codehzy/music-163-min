import { MRequest } from './index';

export function getTopMV(offset = 0, limit = 20){
    return MRequest.get({
        url: "/top/mv",
        data: {
            limit,
            offset
        }
    })
}


export function getMVUrl(id: number) {
  return MRequest.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}

export function getMVInfo(mvid: number) {
  return MRequest.get({
    url: "/mv/detail",
    data: {
      mvid
    }
  })
}

export function getMVRelated(id: number) {
  return MRequest.get({
    url: "/related/allvideo",
    data: {
      id
    }
  })
}
