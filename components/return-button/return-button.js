// components/return-button/return-button.js
const capsule = wx.getMenuButtonBoundingClientRect()
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    capTop: capsule.top,
    capWidth: capsule.width,
    capHeight: capsule.height
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPressed(){
      wx.navigateBack({})
    }
  }
})