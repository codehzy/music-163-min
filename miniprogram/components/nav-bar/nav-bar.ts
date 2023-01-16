// components/nav-bar/nav-bar.ts
// @ts-ignore
const app = getApp();

Component({
  // 多插槽时候使用
  options: {
    multipleSlots: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "标题",
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusHeight: 20,
  },
  lifetimes: {
    attached() {
      // @ts-ignore
      this.setData({ statusHeight: app.globalData.statusHeight })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeftClick(){
      // @ts-ignore
      this.triggerEvent("leftClick");
    }
  },
});
