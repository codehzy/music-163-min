import {
  getMusicBanner,
  getSongMenuList,
} from "../../services/music";
import querySelect from "../../utils/query-select";
import { throttle } from "underscore";
import recommendStore from "../../store/recommendStore";
import playerStore from "../../store/playerStore";
import rankingStore, { rankingsMap } from "../../store/rankingStore";

const querySelectorThrottle = throttle(querySelect, 1000);
const app = getApp();
// pages/main-music/main-music.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    bannerList: [],
    bannerHeight: 375,
    recommendSongs: [],
    hotMenuList: [],
    recMenuList: [],
    screenWidth: 375,

    // 巅峰榜数据
    isRankingData: false,
    rankingInfos: {},
  },

  onRecommendMoreClick() {
    wx.navigateTo({
      url: "/pages/detail-song/detail-song?type=recommend",
    });
  },

  onSearchClick() {
    wx.navigateTo({
      url: "/pages/detail-search/detail-search",
    });
  },

  async fetchMusicBanner() {
    const { banners } = await getMusicBanner();

    this.setData({
      bannerList: banners,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.fetchMusicBanner();
    // this.fetchRecommendSongs(3778678)
    this.fetchSongMenuList();

    recommendStore.dispatch("fetchRecommendSongs");
    this.setRecommendSongs();

    this.setRankingData();
    rankingStore.dispatch("fetchRankingDataAction");

    // 获取屏幕尺寸
    this.setData({ screenWidth: app.globalData.screenWidth });
  },

  setRecommendSongs() {
    recommendStore.onState("recommendSongsInfo", (value: any) => {
      if(!value.tracks) return
      this.setData({
        recommendSongs: value.tracks.slice(0, 10),
      });
    });
  },

  setRankingData() {
    // rankingStore.onState("newRanking", this.handleNewRanking);
    // rankingStore.onState("originRanking", this.handleOriginRanking);
    // rankingStore.onState("upRanking", this.handleUpRanking);

    // rankingStore.onState("newRanking", this.getRankingHandler("newRanking"));
    // rankingStore.onState("originRanking", this.getRankingHandler("originRanking"));
    // rankingStore.onState("upRanking", this.getRankingHandler("upRanking"));

    for(const key in rankingsMap){
      rankingStore.onState(key, this.getRankingHandler(key));
    }
  },

  onSongItemTap(e: WechatMiniprogram.TouchEvent) {
    const index = e.currentTarget.dataset.index;
    playerStore.setState("playSongList", this.data.recommendSongs);
    playerStore.setState("playSongIndex", index);
  },

  async onBannerImageLoad(e: WechatMiniprogram.Event) {
    const res = await querySelectorThrottle(".banner-image");
    this.setData({
      bannerHeight: res[0].height,
    });
  },

  // handleNewRanking(value:any) {
  //   // console.log("新歌榜:", value);
  //   console.log("新歌榜:", value);

  //   if (!value.name) return
  //   this.setData({ isRankingData: true })
  //   const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },
  // handleOriginRanking(value:any) {
  //   // console.log("原创榜:", value);
  //   if (!value.name) return
  //   this.setData({ isRankingData: true })
  //   const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },
  // handleUpRanking(value:any) {
  //   // console.log("飙升榜:", value);
  //   if (!value.name) return
  //   this.setData({ isRankingData: true })
  //   const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
  //   this.setData({ rankingInfos: newRankingInfos })
  // },

  getRankingHandler(rankingType: string) {
    return (value: any) => {
      const newRankingInfos = { ...this.data.rankingInfos,[rankingType]: value };
      this.setData({ rankingInfos: newRankingInfos });
    };
  },

  async fetchSongMenuList() {
    const res = await getSongMenuList();
    this.setData({ hotMenuList: res.playlists });
    const res1 = await getSongMenuList("华语");
    this.setData({ recMenuList: res1.playlists });
  },

  // async fetchRecommendSongs(id: number) {
  //   const {playlist}= await getPlayListDetail(id)
  //   const {tracks}= playlist
  //   this.setData({
  //     recommendSongs:tracks.slice(0, 10)
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    recommendStore.offState("setRecommendSongs", this.setRecommendSongs);

    // rankingStore.offState("newRanking", this.handleNewRanking);
    // rankingStore.offState("originRanking", this.handleOriginRanking);
    // rankingStore.offState("upRanking", this.handleUpRanking);

    // for(const key of Object.keys(rankingsMap)){
    //   rankingStore.offState(key, this.getRankingHandler(key));
    // }

    Object.keys(rankingsMap).forEach((key) => {
      rankingStore.offState(key, this.getRankingHandler(key));
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
