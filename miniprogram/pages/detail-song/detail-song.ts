import rankingStore from "../../store/rankingStore";
import recommendStore from "../../store/recommendStore";
import { getPlayListDetail } from "../../services/music";
import playerStore from "../../store/playerStore";

// pages/detail-song/detail-song.ts
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "ranking",
    key: "newRanking",
    id: "",

    songsInfo: {
      tracks: [],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: { type: string; key: string; id: string }) {
    const type = options.type;
    this.setData({ type });

    if (type === "ranking") {
      const key = options.key;
      this.data.key = key;
      rankingStore.onState(key, this.handleRanking);
    } else if (type === "recommend") {
      recommendStore.onState("recommendSongsInfo", this.handleRanking);
    } else if (type === "menu") {
      const id = options.id;
      this.data.id = id;
      this.fetchSongMenuInfo();
    }
  },

  async fetchSongMenuInfo() {
    const res = await getPlayListDetail(this.data.id);
    this.setData({ songsInfo: res.playlist });
  },

  handleRanking(value: any) {
    this.setData({ songsInfo: value });
    wx.setNavigationBarTitle({
      title: value.name,
    });
  },

  onSongItemTap() {
    playerStore.setState("playSongList", this.data.songsInfo.tracks)
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
  onUnload() {
    if (this.data.type === "ranking") {
      rankingStore.offState(this.data.key, this.handleRanking);
    } else if (this.data.type === "recommend") {
      recommendStore.offState("recommendSongsInfo", this.handleRanking);
    }
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
