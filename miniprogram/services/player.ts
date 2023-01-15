import { MRequest } from "./index";

export function getSongDetail(ids: [number]) {
  return MRequest.get({
    url: "/song/detail",
    data: {
      ids: ids.join(","),
    },
  });
}

export function getSongLyric(id: number){
    return MRequest.get({
        url: "/lyric",
        data: {
            id
        }
    })
}