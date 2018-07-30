import axios from 'axios';

// 轮播图及热门歌单
export function getHomeData() {
    return axios.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
        .then((res) => {
            return Promise.resolve(res.data)
        })
}