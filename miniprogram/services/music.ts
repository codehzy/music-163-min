import { MRequest } from "./index";


export function getMusicBanner(type = 0) {
  return MRequest.get({
    url: "/banner",
    type
  })
}