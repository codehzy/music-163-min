// 封装实例
import { baseURL } from './config';

class MusicRequest {
    baseURL: string

    constructor(){
        this.baseURL = baseURL
    }

    request(options: {url: string}){
        const { url } = options

        return new Promise((resolve,reject) => {
            wx.request({
                ...options,
                url: this.baseURL + url,
                success: (res) => {
                    resolve(res.data)
                },
                fail: (err) => {
                    reject(err)
                    console.log('err',err);
                }
            })
        })
    }

    get(options: any): Promise<any> {
        return this.request({ ...options, method: 'GET' })
    }

    post(options: any): Promise<any> {
        return this.request({ ...options, method: 'POST' })
    }

}

export const MRequest = new MusicRequest()