// pages/personal/personal.js
var app = getApp()
wx.cloud.init()
Page({
  /**
   * 页面的初始数据
   */
  data: {
   isLogin : '',
   nickname: app.globalData.nickname,
   avatarUrl: app.globalData.avatarUrl,
   yoPeerValue: 360,
  // pickerOptions: ['PolyU', 'HKU', 'HKUST', 'CUHK', 'CITYU', 'HKBU', 'LINGU'],

  },
  getUserProfile:function(e){  //进入登陆界面/个人信息
    wx.navigateTo({
      url:"./login/login"
    })
  },
  getAddressList:function(e){
    wx.reLaunch({
      url:"./addressList/addressList"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      isLogin : app.globalData.isLogin, 
      nickname: app.globalData.nickname,
      avatarUrl: app.globalData.avatarUrl,
      yoPeerValue: app.globalData.yoPeerValue,
    })
    const that = this
    wx.cloud.callFunction({
      name:'getUserInfo',
      success:function(res){
        that.setData({
          // nickname: res.result.nickName,
          // avatarUrl: res.result.avatarUrl,
          // yoPeerValue:res.result.yoPeerValue
        })
      },
      fail:function(res){
        wx.showModal({
          title:"错误",
          content:"" + res
          })
      }
    })
    if(this.data.isLogin !== app.globalData.isLogin){
      // this.setData({
      //   isLogin : app.globalData.isLogin, 
      //   nickname: app.globalData.nickname,
      //   avatarUrl: app.globalData.avatarUrl,
      // })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
    isLogin : app.globalData.isLogin,
    nickname: app.globalData.nickname,
    avatarUrl: app.globalData.avatarUrl,
    yoPeerValue: app.globalData.yoPeerValue,
    });
    // console.log("app.globalData.nickname: " + app.globalData.nickname)
    // console.log("app.globalData.avatarUrl: " + app.globalData.avatarUrl)
    // console.log("avatarUrl: " + this.data.avatarUrl)
    // console.log("nickname: " + this.data.nickname)
  }
})