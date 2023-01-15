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
  setStatusHeight() {
    this.setData({ statusHeight: app.globalData.statusHeight });
  },

  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      // @ts-ignore
      this.setStatusHeight();
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
