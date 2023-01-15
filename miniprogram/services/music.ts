import { MRequest } from "./index";


export function getMusicBanner(type = 0) {
  return MRequest.get({
    url: "/banner",
    type
  })
}

export function getPlayListDetail(id: string) {
  return MRequest.get({
    url: "/playlist/detail",
    data:{
      id
    }
  })
}


export function getSongMenuList(cat = "全部", limit = 6, offset = 0) {
  return MRequest.get({
    url: "/top/playlist",
    data: {
      cat,
      limit,
      offset
    }
  })
}

export function getSongMenuTag() {
  return MRequest.get({
    url: "/playlist/hot"
  })
}