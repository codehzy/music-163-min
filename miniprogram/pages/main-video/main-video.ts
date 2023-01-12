// pages/main-video/main-video.ts
import { getTopMV } from "../../services/video";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    offset: 0,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 发送网络请求
    this.fetchTopList();
  },

  async fetchTopList() {
    // 1. 获取数据
    const res = await getTopMV(this.data.offset);
    // 2. 更新数据
    this.setData({
      videoList: this.data.videoList.concat(res.data),
    });
    // 当这个改变 界面是不需要刷新,因此不需要setData
    this.data.offset = this.data.videoList.length;
    this.data.hasMore = res.hasMore

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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async onPullDownRefresh() {
    // 1. 清空之间的数据
    this.setData({ videoList: [] });
    this.data.offset = 0
    this.data.hasMore = true

    // 2. 请求新的数据
   await this.fetchTopList()
   wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(!this.data.hasMore) return
    this.fetchTopList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
