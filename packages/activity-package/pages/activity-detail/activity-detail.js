// packages/activity-package/pages/activity-detail/activity-detail.js
wx.cloud.init()
var activityID = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityInfo:null
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    activityID = '9fe3c0fd66781b250371751a4163eebd'
    wx.cloud.callFunction({
      name:"getActivityDetail",
      data:{
        activityID:'9fe3c0fd66781b250371751a4163eebd'
      },
      success:function(res){
        that.setData({
          activityInfo:res.result
        },()=>console.log(that.data.activityInfo))
        console.log(res)
      }
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