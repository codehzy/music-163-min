import { getSongMenuList, getSongMenuTag } from '../../services/music';
// pages/detail-menu/detail-menu.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songMenus: [] as any[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.fetchAllMenuList()
  },

  // 发送网络请求
  async fetchAllMenuList(){
    const tagRes = await getSongMenuTag()
    const tags = tagRes.tags

    const promises = []
    for(const tag of tags){
      promises.push(getSongMenuList(tag.name))
    }

    Promise.all(promises).then(res => {
      this.setData({ songMenus: res})
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})