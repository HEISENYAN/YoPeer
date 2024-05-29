// pages/login/login.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// const defaultAvatarUrl = "../../icons/portrait.png"
const defaultNickname = "昵称"
const defaultPhoneNum = "电话"
var avatarUrl = ''
var app = getApp()
wx.cloud.init()
const data = {
  areaList: [
    {
      label: '八校学生',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '香港理工大学',
          children: [
            { value: '110101', label: '何文田宿舍(佛光街15号)' },
            { value: '110102', label: '红磡宿舍(红荔道1号)' },
            { value: '110103', label: '其他' },
          ],
        },
        {
          value: '110110',
          label: '香港其他大学',
          children: [
            { value: '110111', label: '其他' },
            { value: '110112', label: '其他' },
            { value: '110113', label: '其他' },
          ],
        },
      ],
    },
    {
      label: '其他',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            { value: '120101', label: '和平区' },
            { value: '120102', label: '河东区' },
            { value: '120103', label: '河西区' },
            { value: '120104', label: '南开区' },
            { value: '120105', label: '河北区' },
            { value: '120106', label: '红桥区' },
            { value: '120110', label: '东丽区' },
            { value: '120111', label: '西青区' },
            { value: '120112', label: '津南区' },
            { value: '120113', label: '北辰区' },
            { value: '120114', label: '武清区' },
            { value: '120115', label: '宝坻区' },
            { value: '120116', label: '滨海新区' },
            { value: '120117', label: '宁河区' },
            { value: '120118', label: '静海区' },
            { value: '120119', label: '蓟州区' },
          ],
        },
      ],
    },
  ],
};
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin : '',
    style: 'border-radius: 12rpx;',
    cityText: '',
    cityValue: [],
    citys: [
      { label: '不选择', value: '不选择' },
      { label: '香港大学', value: '香港大学' },
      { label: '香港中文大学', value: '香港中文大学' },
      { label: '香港科技大学', value: '香港科技大学' },
      { label: '香港城市大学', value: '香港城市大学' },
      { label: '香港理工大学', value: '香港理工大学' },
      { label: '香港浸会大学', value: '香港浸会大学' },
      { label: '香港岭南大学', value: '香港岭南大学' },
      { label: '香港教育大学', value: '香港教育大学' },
    ],
    phoneError: false,
    avatarUrl: '',
    nickname: '',
    phoneNum: '',
    school: '',
    // 地址
    options: data.areaList,
    note: '请选择地址',
    visible: false,
    subTitles: ['请选择', '请选择', '请选择'],
  },
  showCascader() {
    this.setData({ visible: true });
  },
  onChange(e) {
    const { selectedOptions } = e.detail;
    this.setData({
      note: selectedOptions.map((item) => item.label).join('/'),
    });
  },
  onChooseAvatar(e) {//修改头像
    console.log(e);
    // avatarUrl = e.detail.avatarUrl
    this.setData({
      avatarUrl:e.detail.avatarUrl
    })
    app.globalData.avatarUrl = e.detail.avatarUrl;
  },
  onPhoneInput(e) {
    const { phoneError } = this.data;
    const isPhoneNumber = /^(852|853)\d{8}$|^86\d{11}$/.test(e.detail.value);
    if (phoneError === isPhoneNumber) {
      this.setData({
        phoneError: !isPhoneNumber,
      });
    }
  },
  // onColumnChange(e) {
  //   console.log('picker pick:', e);
  // },
  onPickerChange(e) {
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    // console.log('picker change:', e.detail);
    console.log('select:', e.detail.value);
    console.log("key: " + key)
    console.log("value: " + value)
    // if(e.detail.value=="香港理工大学")  console.log("yessssssss")
    this.setData({
      school: e.detail.value,
      [`${key}Visible`]: false,
      [`${key}Value`]: value,
      [`${key}Text`]: value.join(' '),
    });
    app.globalData.school = e.detail.value;
    // console.log("app.globalData.school: " + app.globalData.school)
  },
  onPickerCancel(e) {
    const { key } = e.currentTarget.dataset;
    // console.log(e, '取消');
    console.log('picker cancel:');
    this.setData({
      [`${key}Visible`]: false,
    });
  },
  onCityPicker() {
    this.setData({ cityVisible: true });  //show the list of cities
  },
  formSubmit(e){
    // if(e.detail.value.nickname){console.log("nickname valid")}
    // else{console.log("nickname invalid")}
    // console.log("e.detail.value.phoneNum: " + e.detail.value.phoneNum)
    // console.log("e.detail.value.nickname: " + e.detail.value.nickname)
    if(e.detail.value.nickname)  app.globalData.nickname = e.detail.value.nickname;
    if(e.detail.value.phoneNum)  app.globalData.phoneNum = e.detail.value.phoneNum;
    // console.log("app.globalData.nickname: " + app.globalData.nickname)
    // console.log("app.globalData.phoneNum: " + app.globalData.phoneNum)
    const updatedPhoneNum = (e.detail.value.phoneNum)? e.detail.value.phoneNum : this.data.phoneNum;
    const updatedNickname = (e.detail.value.nickname)? e.detail.value.nickname : this.data.nickname;
    // console.log(e)
    console.log("database: app.globalData.school: " + app.globalData.school)
    wx.cloud.callFunction({
      name: 'userUpdate',
      data:{
        phoneNumber : updatedPhoneNum,
        nickName: updatedNickname,
        avatarUrl: this.data.avatarUrl,
        school: app.globalData.school,
      },
      success:function(res){
        wx.showToast({
          title:"修改成功",
          icon:"success",
          duration:1500,
          mask: true
        })
        wx.reLaunch({  //提交按钮，返回个人中心
          url: '../personal',
        })
      },
      fail:function(res){
        wx.showModal({
        title:"错误",
        content:"" + res
        })
      }
    })
    // wx.reLaunch({  //提交按钮，返回个人中心
    //   url: '../personal',
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isLogin : app.globalData.isLogin,
      avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : defaultAvatarUrl,
      nickname: (app.globalData.nickname!="游客") ? app.globalData.nickname : defaultNickname,
      phoneNum: (app.globalData.phoneNum!="12345678") ? app.globalData.phoneNum : defaultPhoneNum,
      cityText: app.globalData.school
      });
      // console.log("app.globalData.nickname: " + app.globalData.nickname)
      // console.log("app.globalData.phoneNum: " + app.globalData.phoneNum)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})