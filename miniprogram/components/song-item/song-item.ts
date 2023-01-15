// components/song-item/song-item.ts
import recommendStore from "../../store/recommendStore"
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemData:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    songs:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  onLoad() {
    recommendStore.onState("recommendSongs", (value: any) => {
      this.setData({
        songs: value
      })
    })
  },
  unLoad() {
    recommendStore.offState("recommendSongs",(value:any) => {
      this.setData({
        songs: value
      })
    })
  }
})
