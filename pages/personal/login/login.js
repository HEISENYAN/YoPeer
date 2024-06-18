// pages/login/login.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// const defaultAvatarUrl = "../../icons/portrait.png"
const defaultNickname = "昵称"
const defaultPhoneNum = "电话"
var app = getApp()
var avatarUrl = ''

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
          label: '九龙',
          children: [
            { value: '900101', label: '观塘区' },
            { value: '900102', label: '黄大仙区' },
            { value: '900103', label: '九龙城区' },
            { value: '900104', label: '深水埗区' },
            { value: '900105', label: '油尖旺区' },
          ],
        },
        {
          value: '910000',
          label: '香港岛',
          children: [
            { value: '910100', label: '东区' },
            { value: '910200', label: '南区' },
            { value: '910300', label: '湾仔区' },
            { value: '910400', label: '中西区' },
          ],
        },
        {
          value: '920000',
          label: '新界',
          children: [
            { value: '920100', label: '北区' },
            { value: '920200', label: '大埔区' },
            { value: '920300', label: '葵青区' },
            { value: '920400', label: '离岛区' },
            { value: '920500', label: '荃湾区' },
            { value: '920600', label: '沙田区' },
            { value: '920700', label: '屯门区' },
            { value: '920800', label: '西贡区' },
            { value: '920900', label: '元朗区' },
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
    schoolText: '',
    schoolValue: '',
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
    avatarUrl: app.globalData.avatarUrl,
    nickname: app.globalData.nickName,
    phoneNum: app.globalData.phoneNumber,
    school: app.globalData.school,
    // 地址
    // options: data.areaList,
    // note: '请选择地址',
    // visible: false,
    // subTitles: ['请选择', '请选择', '请选择'],

    // 选择手机号码区号
    phoneAreaText: '+86',
    phoneAreaValue: '',
    maxphonenum: 11,
    // selectedArea:'+86',
    showAreaPicker:false,
    areas: [
      { label: '中国大陆 +86', value: '+86' },
      { label: '中国香港 +852', value: '+852' },
      { label: '中国澳门 +853', value: '+853' }
    ],
  },

  onSelectArea(){  //点击区号
    this.setData({showAreaPicker:true})
  },
  // 选择地址
  // showCascader() {
  //   this.setData({ visible: true });
  // },
  // onChange(e) {
  //   const { selectedOptions } = e.detail;
  //   this.setData({
  //     note: selectedOptions.map((item) => item.label).join('/'),
  //   });
  // },
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
  onPickerChange(e) {  //学校 或 手机区号
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;
    // console.log('select:', e.detail);
    // console.log("key: " + key)
    // console.log("value: " + value)
    // console.log(e)
    this.setData({
      school: key == "school" ? e.detail.value : this.data.school,
      [`${key}Visible`]: false,  //是否显示picker
      [`${key}Value`]: value,  //picker 显示值
      [`${key}Text`]: value.join(' '),  //显示在cell
    });
    if(key=="school"){
      app.globalData.school = value;
    }
    if(key=="phoneArea"){
      if(e.detail.value=="+852"||e.detail.value=="+853")  this.setData({maxphonenum: 8})
      else if (e.detail.value=="+86")  this.setData({maxphonenum: 11})
      app.globalData.phoneAreaValue = value;
    }
    
  },
  onPhoneAreaChanage(e){  //选择手机号码区号
    this.setData({selectedArea:e.detail.value[0]})
    if(e.detail.value[0]=="+852"||e.detail.value[0]=="+853")  this.setData({maxphonenum: 8})
    else if (e.detail.value[0]=="+86")  this.setData({maxphonenum: 11})
  },
  onPickerCancel(e) {  //取消选择(区号 或 学校)
    const { key } = e.currentTarget.dataset;
    this.setData({
      [`${key}Visible`]: false,
    });
  },
  onSchoolPicker() {
    this.setData({ schoolVisible: true });  //show the list of schools
  },
  onPhoneAreaPicker(){
    this.setData({ phoneAreaVisible: true });
  },
  onNickNameInput(e) {//昵称变化
    // console.log(e.detail.value)
  },
  formSubmit(e){
    if(e.detail.value.nickname)  app.globalData.nickname = e.detail.value.nickname;
    if(e.detail.value.phoneNum)  app.globalData.phoneNum = e.detail.value.phoneNum;
    const updatedPhoneNum = (e.detail.value.phoneNum)? e.detail.value.phoneNum : this.data.phoneNum;
    const updatedNickname = (e.detail.value.nickname)? e.detail.value.nickname : this.data.nickname;
    wx.cloud.callFunction({
      name: 'userUpdate',
      data:{
        phoneNumber : updatedPhoneNum,
        nickName: updatedNickname,
        avatarUrl: this.data.avatarUrl,
        school: app.globalData.school,
        isRegistered: true
      },
      success:function(res){
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
    // console.log("schoolValue", String(app.globalData.school).split(' '))
    this.setData({
      isLogin : app.globalData.isLogin,
      avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : defaultAvatarUrl,
      nickname: (app.globalData.nickname!="游客") ? app.globalData.nickname : defaultNickname,
      phoneNum: (app.globalData.phoneNum!="12345678") ? app.globalData.phoneNum : defaultPhoneNum,
      phoneAreaValue: app.globalData.phoneAreaValue,  //显示在picker
      phoneAreaText: app.globalData.phoneAreaValue[0],  //显示在cell
      maxphonenum: (app.globalData.phoneAreaValue=="+86") ? 11 : 8,
      schoolText: app.globalData.school,  //显示在cell
      schoolValue: String(app.globalData.school).split(' ')  //显示在picker
      });
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