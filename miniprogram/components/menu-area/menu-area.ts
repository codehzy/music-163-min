// components/menu-area/menu-area.ts
// @ts-ignore
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认歌单",
    },
    menuList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: 375,
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {
      // @ts-ignore
      this.setData({ screenWidth: app.globalData.screenWidth });
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onMenuMoreClick() {
      wx.navigateTo({
        url: "/pages/detail-menu/detail-menu",
      });
    },
  },
});
