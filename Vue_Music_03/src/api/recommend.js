import axios from 'axios';
// import qs from 'qs';

// qs.stringify({
//     pageSize: 3,
//     menuBelong: '066c3d2dacfb4bfa8f701c6716b2e00a',
//     hasImg: 1,
//     pageNum: 1
// })

// 轮播图及热门歌单
export function getHomeData() {
    return axios.get('/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg')
        .then((res) => {
            return Promise.resolve(res.data)
        })
}