import axios from 'axios'
import { singerParams } from './config'

export function getSingerList() {
    return axios.get('/qqmusic/v8/fcg-bin/v8.fcg', {
        params: singerParams
    })
        .then((res) => {
            return Promise.resolve(res.data)
        })
}