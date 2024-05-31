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
      value: '100000',
      label: '香港大学 HKU',
      children: [
        { value: '100100', label: '校内宿舍（李国贤堂、太古堂、研究生堂）' },
        { value: '100101', label: '一村（何东夫人堂、施德堂、利玛窦堂）' },
        { value: '100102', label: '二村（马礼逊堂、李兆基堂、孙志新堂）' },
        { value: '100103', label: '赛马会第三学生村' },
        { value: '100104', label: '四村（利希慎堂、利铭泽堂、伟伦堂）' },
        { value: '100105', label: '梅芳堂' },
      ],
    },
    {
      value: '200000',
      label: '香港中文大学 CUHK',
      children: [
        { value: '200100', label: '汤若望宿舍' },
        { value: '200101', label: '伯利衡宿舍' },
        { value: '200102', label: '陈震夏宿舍' },
        { value: '200103', label: '恒生楼' },
      ],
    },
    {
      value: '300000',
      label: '香港科技大学 HKUST',
      children: [
        { value: '300100', label: '本科生宿舍一' },
        { value: '300101', label: '本科生宿舍二' },
        { value: '300102', label: '本科生宿舍三' },
        { value: '300103', label: '本科生宿舍四' },
        { value: '300104', label: '本科生宿舍五' },
        { value: '300105', label: '本科生宿舍六' },
        { value: '300106', label: '本科生宿舍七' },
        { value: '300107', label: '本科生宿舍八' },
        { value: '300108', label: '本科生宿舍九' },
        { value: '300109', label: '赛马会宿舍' },
        { value: '300110', label: 'UA' },
        { value: '300111', label: 'SKCC' },
        { value: '300112', label: 'GGT' },
      ],
    },
    {
      value: '400000',
      label: '香港理工大学 PolyU',
      children: [
        { value: '400100', label: '何文田宿舍(佛光街15号)' },
        { value: '400101', label: '红磡宿舍(红荔道1号)' },
      ],
    },
    {
      value: '500000',
      label: '香港城市大学 CityU',
      children: [
        { value: '500100', label: '九龙塘宿舍' },
        { value: '500101', label: '马鞍山宿舍' },
      ],
    },
    {
      value: '600000',
      label: '香港浸会大学 BU',
      children: [
        { value: '600100', label: '浸会大学宿舍' },
      ],
    },
    {
      value: '700000',
      label: '香港岭南大学 LNU',
      children: [
        { value: '700100', label: '南部宿舍' },
        { value: '700101', label: '赛马会宿舍' },
        { value: '700102', label: '黄虎泉堂和吴洁仪堂' },
      ],
    },
    {
      value: '800000',
      label: '香港教育大学 EduHK',
      children: [
        { value: '800100', label: '罗富国堂' },
        { value: '800101', label: '葛亮洪堂' },
        { value: '800102', label: '柏立基堂' },
        { value: '800103', label: '赛马会学生宿舍' },
      ],
    },
    {
      value: '900000',
      label: '其他',
      children: [
        {
          value: '900100',
          label: '北区',
          children: [
            { value: '900101', label: '打鼓岭' },
            { value: '900102', label: '粉岭' },
            { value: '900103', label: '古洞' },
            { value: '900104', label: '洪桥新村' },
            { value: '900105', label: '坪輋' },
            { value: '900106', label: '上水' },
            { value: '900107', label: '沙头角' },
            { value: '900108', label: '文锦渡' },
          ],
        },
        {
          value: '900200',
          label: '东区',
          children: [
            { value: '900201', label: 'XXX' },
            { value: '900202', label: 'XXX' },
          ],
        },
        {
          value: '900300',
          label: '大埔区',
          children: [
            { value: '900301', label: 'XXX' },
            { value: '900302', label: 'XXX' },
          ],
        },
        {
          value: '900400',
          label: '九龙城区',
          children: [
            { value: '900401', label: '红磡' },
            { value: '900402', label: '何文田' },
            { value: '900403', label: '九龙塘' },
            { value: '900404', label: '九龙城' },
            { value: '900405', label: '马头围' },
            { value: '900406', label: '启德' },
            { value: '900407', label: '土瓜湾' },
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