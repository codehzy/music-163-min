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