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
    onSongItemTap(){
      // @ts-ignore
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/music-player/music-player?id=${id}`
      })
    }

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
