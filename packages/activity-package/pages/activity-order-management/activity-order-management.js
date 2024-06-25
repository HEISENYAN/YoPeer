// packages/activity-package/pages/activity-order-management/activity-order-management.js
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityOrderInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const that = this
    wx.cloud.callFunction({
      name:"getActivityOrder",
      success:function(res){
        that.setData({
          activityOrderInfo:res.result
        })
      },
      fail:function(err){
        wx.showToast({
          title: '加载失败',
          icon:"error"
        })
      }
    })
  },
  onGetActivityDetail(e){
    wx.navigateTo({
      url: '/packages/activity-package/pages/activity-detail/activity-detail?activityID='+e.target.dataset.activityID,
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