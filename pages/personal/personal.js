// pages/personal/personal.js
var app = getApp()
wx.cloud.init()
Page({
  /**
   * 页面的初始数据
   */
  data: {
   isLogin : '',
   nickname: '',
   avatarUrl: app.globalData.avatarUrl,
   yoPeerValue: 300,
  //学校 下拉列表
  isPickerShown: false,
  // pickerOptions: ['PolyU', 'HKU', 'HKUST', 'CUHK', 'CITYU', 'HKBU', 'LINGU'],
  pickerOptions: ['香港大学', '香港中文大学', '香港科技大学', '香港城市大学', '香港理工大学', '香港浸会大学', '香港岭南大学', '香港教育大学'],
  selectedIndex: 0,
  //phone num
  isModalShown: false, // 控制弹窗是否显示
  // phoneNum: '', // 存储用户输入的值
  },
  getUserProfile:function(e){  //进入登陆界面/个人信息
    wx.reLaunch({
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
  onLoad(options) {
    const that = this
    wx.cloud.callFunction({
      name:'getUserInfo',
      success:function(res){
        console.log(res)
        that.setData({
          //selectedIndex: Boolean(res.data.schoolIndex)?res.data.schoolIndex:0,
          nickname: res.result.nickname,
          avatarUrl: res.result.avatarUrl,
          yoPeerValue:res.result.yoPeerValue
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
      this.setData({
        isLogin : app.globalData.isLogin, 
        nickname: app.globalData.nickname,
        avatarUrl: app.globalData.avatarUrl,
      })
    }
  },

  //学校 下拉列表
  showPicker() {
    this.setData({
      isPickerShown: true,
    });
  },
  onPickerChange(e) {
    this.setData({
      selectedIndex: e.detail.value,
    });
  },
  onCancel() {
    this.setData({
      isPickerShown: false,
    });
  },
  onConfirm() {
    this.setData({
      isPickerShown: false,
    });
    const selectedOption = this.data.pickerOptions[this.data.selectedIndex];
    console.log('用户选择了:', selectedOption); // 根据需要处理选中的选项
  },

  //电话输入
  // phoneNumInput(value){
  //   this.setData({ phoneNum: value });
  // },
  showInputModal() {
    this.toggleModal(); // 调用toggleModal函数显示弹窗
  },
  toggleModal() {
    this.setData({
      isModalShown: !this.isModalShown,
    });
  },
  onInputChange(e) {
    this.setData({
      phoneNum: e.detail.value,
    });
  },
  onConfirm() {
    console.log('用户输入的内容:', this.data.phoneNum); // 处理用户输入的值，如提交到服务器、更新状态等
    this.toggleModal(); // 关闭弹窗
  },
  onCancel() {
    this.toggleModal(); // 直接关闭弹窗，不保存用户输入
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
    isLogin : app.globalData.isLogin,
    nickname: app.globalData.nickname,
    avatarUrl: app.globalData.avatarUrl,
    yoPeerValue: app.globalData.yoPeerValue,
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