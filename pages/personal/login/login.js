// pages/login/login.js
// const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
const defaultAvatarUrl = "../../icons/portrait.png"
const defaultNickname = "昵称"
const defaultPhoneNum = "电话"
var app = getApp()
wx.cloud.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : defaultAvatarUrl,
    nickname: (app.globalData.nickname!="游客") ? app.globalData.nickname : defaultNickname,
    // nickname: defaultNickname,
    phoneNum: (app.globalData.phoneNum!="12345678") ? app.globalData.phoneNum : defaultPhoneNum,
  },
  
  onChooseAvatar(e) {//修改头像
    console.log(e);
    this.setData({
      avatarUrl:e.detail.avatarUrl
    })
  },
  handleButtonClick() {//返回
    wx.reLaunch({
      url: '../personal'
      // delta: 1
    });
  },
  formSubmit(e){
    // console.log("Submitted nickname: " + e.detail.value.nickname);
    // console.log("Submitted phoneNum: " + e.detail.value.phoneNum);
    if(e.detail.value.nickname)  app.globalData.nickname = e.detail.value.nickname;
    if(e.detail.value.phoneNum)  app.globalData.phoneNum = e.detail.value.phoneNum;
    // app.globalData.avatarUrl = e.detail.value.avatarUrl;
    wx.cloud.callFunction({
      name: 'userUpdate',
      data:{
        phoneNumber : e.detail.value.phoneNum,
        nickName: e.detail.value.nickname,
        avatarUrl: this.data.avatarUrl
      },
      success:function(res){
        wx.showToast({
          title:"修改成功",
          icon:"success",
          duration:1500
        })
        console.log(res)
      },
      fail:function(res){
        console.log(res)
        wx.showModal({
        title:"错误",
        content:"" + res
        })
      }
    })
    

    wx.reLaunch({  //提交按钮，返回个人中心
      url: '../personal',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    this.setData({
      avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : defaultAvatarUrl,
      nickname: (app.globalData.nickname!="游客") ? app.globalData.nickname : defaultNickname,
      phoneNum: (app.globalData.phoneNum!="12345678") ? app.globalData.phoneNum : defaultPhoneNum,
      });

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
console.log("app.globalData.phoneNum!=" + app.globalData.phoneNum!="123456")