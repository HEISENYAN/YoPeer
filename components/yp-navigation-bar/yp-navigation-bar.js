// components/yp-navigation-bar/yp-navigation-bar.js


const capsule = wx.getMenuButtonBoundingClientRect()
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type:String,
      value:""
    },
    returnButton: {
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height:capsule.bottom + 7,
    size:capsule.height,
    margin:capsule.top
  },

  /**
   * 组件的方法列表
   */
  methods: {
    returnToPage:function(){
      wx.navigateBack()
    }
  }
})