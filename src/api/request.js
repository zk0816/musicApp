import {axiosInstance} from './config'

// 可获取 banner( 轮播图 ) 数据
export const getBannerRequest = () => {
  return axiosInstance.get ('/banner');
}

// 可获取推荐 mv
export const getRecommendListRequest = () => {
  return axiosInstance.get ('/personalized');
}

// 热门歌手
export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

// 歌手分类列表
export const getSingerListRequest= (type='',category='', alpha='', count) => {
  return axiosInstance.get(`/artist/list?type=${type}&area=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

//排行榜
export const getRankListRequest = () => {
  return axiosInstance.get (`/toplist/detail`);
};

//歌单详情
export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

//歌手详情
export const getSingerInfoRequest = id => {
  return axiosInstance.get (`/artists?id=${id}`);
};

//请求歌词
export const getLyricRequest = id => {
  return axiosInstance.get (`/lyric?id=${id}`);
};

//热搜列表(简略)
export const getHotKeyWordsRequest = () => {
  return axiosInstance.get (`/search/hot`);
};

//搜索建议
export const getSuggestListRequest = query => {
  return axiosInstance.get (`/search/suggest?keywords=${query}`);
};

//搜索
export const getResultSongsListRequest = query => {
  return axiosInstance.get (`/search?keywords=${query}`);
};

//歌曲详情
export const getSongDetailRequest = id => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};