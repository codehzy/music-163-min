import { getSongDetail, getSongLyric } from "../../services/player";
// pages/music-player/music-player.ts
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    currentSong: {},
    lrcString: "",

    pageTitles: ["歌曲", "歌词"],
    currentPage: 0,

    statusHeight: 20,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    // 0. 获取设备信息
    this.setData({ statusHeight: app.globalData.statusHeight });

    // 1. 获取传入的id
    const id = options.id;
    this.setData({ id });

    // 2. 获取歌曲详情
    this.fetchSongDetail();

    // 3. 获取歌词
    this.fetchSongLyric();
  },

  async fetchSongDetail() {
    const res = await getSongDetail([this.data.id]);
    this.setData({ currentSong: res.songs[0] });
  },

  async fetchSongLyric() {
    const res = await getSongLyric(this.data.id);
    this.setData({ lrcString: res.lrc.lyric });
  },

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
  onUnload() {},

  onNavBackTap() {
    wx.navigateBack();
  },

  onNavTabItemTap(event: WechatMiniprogram.Event) {
    const index = Number(event.currentTarget.dataset.index);
    this.setData({ currentPage: index });
  },

  onSwiperChange(event: WechatMiniprogram.SwiperChange) {
    this.setData({ currentPage: event.detail.current });
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
