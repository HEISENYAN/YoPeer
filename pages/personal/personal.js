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
  // isPickerShown: false,
  // pickerOptions: ['PolyU', 'HKU', 'HKUST', 'CUHK', 'CITYU', 'HKBU', 'LINGU'],
  // pickerOptions: ['香港大学', '香港中文大学', '香港科技大学', '香港城市大学', '香港理工大学', '香港浸会大学', '香港岭南大学', '香港教育大学'],
  // selectedIndex: 0,
  // isModalShown: false, // 控制弹窗是否显示
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