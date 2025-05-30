import Toast from 'tdesign-miniprogram/toast/index';
const SHA256 = require("../../../utils/sha256")
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
// const defaultAvatarUrl = "../../icons/portrait.png"
// const defaultNickname = "昵称"
// const defaultPhoneNum = "电话"
var app = getApp()
var avatarUrl = ''
wx.cloud.init()
var nickNameReviewFlag = 0  //1: proper
var ifNickNameReviewed = 0
var ifFormChange = 0  //1: changed
var ifChooseAvatar = 0

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
      { label: '香港大学', value: '香港大学' },
      { label: '香港中文大学', value: '香港中文大学' },
      { label: '香港科技大学', value: '香港科技大学' },
      { label: '香港城市大学', value: '香港城市大学' },
      { label: '香港理工大学', value: '香港理工大学' },
      { label: '香港浸会大学', value: '香港浸会大学' },
      { label: '香港岭南大学', value: '香港岭南大学' },
      { label: '香港教育大学', value: '香港教育大学' },
      { label: '其他学校', value: '其他学校' },
    ],
    phoneError: false,
    avatarUrl: app.globalData.avatarUrl,
    nickname: app.globalData.nickName,
    phoneNum: app.globalData.phoneNumber,
    wechatID: app.globalData.wechatID,
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
    privacyAgreeValue:false
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
    ifFormChange = 1
    const that = this
    const pathRandom = Date.now().toString() + Math.round(Math.random() * 1000).toString()
    wx.showLoading({
      title: '正在上传头像',
    })
    wx.cloud.uploadFile({
      cloudPath: 'yopeer-user-avatar/' + SHA256(pathRandom) + '.jpeg', // 上传至云端的路径
      filePath: e.detail.avatarUrl, // 小程序临时文件路径
      success: res => {
        wx.hideLoading()
        that.setData({
          avatarUrl:res.fileID
        })
        app.globalData.avatarUrl = res.fileID;
        ifChooseAvatar = 1
        // console.log(res.fileID)
      },
      fail: res =>{
        wx.hideLoading()
        wx.showToast({
          title: '上传失败',
          icon:"error"
        })
      }
    })
    
  },
  // onPhoneInput(e) {
  //   const { phoneError } = this.data;
  //   const isPhoneNumber = /^(852|853)\d{8}$|^86\d{11}$/.test(e.detail.value);
  //   if (phoneError === isPhoneNumber) {
  //     this.setData({
  //       phoneError: !isPhoneNumber,
  //     });
  //   }
  // },
  onNicknameChange(e){
    let nicknameValue = e.detail.value;
    // nicknameValue = nicknameValue.replace(/[^\u4e00-\u9fa5a-zA-Z_]/g, '');  //^：非；\u4e00-\u9fa5:中文；a-zA-Z：英文；_：下划线
    nicknameValue = nicknameValue.replace(/\s/g, '');  //限制空格
    ifFormChange = 1
    this.setData({
      nickname: nicknameValue
    })
  },
  onPhoneNumChange(e){
    ifFormChange = 1
    let phoneNumValue = e.detail.value;
    phoneNumValue = phoneNumValue.replace(/\s/g, '').replace(/\D/g, '');  //number only
    this.setData({
      phoneNum: phoneNumValue
    })
  },
  onColumnChange(e) {
    wx.vibrateShort({type:"light"})
  },
  onPickerChange(e) {  //学校 或 手机区号
    const { key } = e.currentTarget.dataset;
    const { value } = e.detail;  //取字典中key为"value"的值
    // console.log('select:', e.detail);
    // console.log("key: " + key)
    // console.log("value: " + value)
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
    ifFormChange=1
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
  // onNickNameInput(e) {//昵称变化
  //   ifFormChange = 1  //changed
  // },
  onNicknameFocus(){
    ifNickNameReviewed=0
  },
  nickNameReview(e) {  //审核昵称
    if (e.detail.pass&&this.data.nickname.length!=0){
      nickNameReviewFlag = 1  //pass
    } 
    else {
      nickNameReviewFlag = 0  //fail
      this.setData({
        nickname: ''
      })
    }
    ifNickNameReviewed = 1
  },
  cloudCall(e, that){
    wx.cloud.callFunction({
      name: 'userUpdate',
      data:{
        phoneNumber : (e.detail.value.phoneNum)? that.data.phoneAreaText + " " + e.detail.value.phoneNum : that.data.phoneAreaText + " " + that.data.phoneNum,
        nickName: (e.detail.value.nickname)? e.detail.value.nickname : that.data.nickname,
        avatarUrl: app.globalData.avatarUrl,
        wechatID: (e.detail.value.wechatID) ? e.detail.value.wechatID : that.data.wechatID,
        school: app.globalData.school,
        isRegistered: true
      },
      success:function(res){
        wx.hideLoading()
        wx.navigateBack()
      },
      fail:function(res){
        wx.hideLoading()
        wx.showModal({
        title:"错误",
        content:"" + res
        })
      }
    })
  },
  privacyAgreeChange(event) {
    this.setData({
      privacyAgreeValue: event.detail
    })
  },
  formSubmit(e){
    const that = this
    if(e.detail.value.nickname.length==0){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入用户名',
        theme: 'warning',
        direction: 'row',
        placement: 'bottom'
      });
    }
    else if(e.detail.value.phoneNum.length!=this.data.maxphonenum&&e.detail.value.phoneNum.length!=0){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入正确的手机号!',
        theme: 'error',
        direction: 'row',
        placement: 'bottom'
      });
    }
    else if(this.data.privacyAgreeValue==false){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请详细阅读并同意《鱼饼社区隐私协议》《鱼饼社区公约》',
        theme: 'warning',
        direction: 'row',
        placement: 'bottom'
      });
    }
    else if(ifFormChange==0){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请更新个人资料',
        theme: 'warning',
        direction: 'row',
        placement: 'bottom'
      });
    }
    else if((nickNameReviewFlag==1&&ifNickNameReviewed==1)||ifFormChange==1){
      wx.showLoading({
        title: '正在更新'
      })
      if(e.detail.value.nickname)  app.globalData.nickName = this.data.nickname;
      if(e.detail.value.phoneNum)  app.globalData.phoneNum = e.detail.value.phoneNum;
      if(e.detail.value.wechatID)  app.globalData.wechatID = e.detail.value.wechatID;
      wx.cloud.callFunction({
        name:"judgeRiskyContent",
        data:{
          content: app.globalData.nickName,
          scene:3
        },
        success:function(res){
          if(res.result.result.result.suggest == "pass"){
            
            that.cloudCall(e, that)
            nickNameReviewFlag = 0
            ifNickNameReviewed = 0
          }
          else{
            wx.hideLoading()
            wx.showModal({
              title:"昵称不可用",
              content:"您使用的昵称可能包含：广告；时政；色情； 辱骂； 违法犯罪； 欺诈； 低俗； 版权；或其它敏感信息，请重新填写。"
            })
            nickNameReviewFlag = 0
            ifNickNameReviewed = 0
          }
        },
        fail:function(res){
          wx.hideLoading()
          wx.showToast({
            title: '请重试',
            icon:"error"
          })
        }
      })
      
    }
  },
  privacyNavigate1(){
    wx.navigateTo({
      url: './privacyPolicy/privacyPolicy',
    })
  },
  privacyNavigate2(){
    wx.navigateTo({
      url: './communityPolicy/communityPolicy',
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
    ifFormChange = 0
    let phoneNumValue = app.globalData.phoneNum.replace(/\s/g, '').replace(/\D/g, '');  //number only
    this.setData({
      isLogin : app.globalData.isLogin,
      avatarUrl: app.globalData.avatarUrl ? app.globalData.avatarUrl : defaultAvatarUrl,
      // nickname: (app.globalData.nickname!="游客") ? app.globalData.nickname : defaultNickname,
      // phoneNum: (app.globalData.phoneNum!="12345678") ? app.globalData.phoneNum : defaultPhoneNum,
      nickname: app.globalData.nickName,
      phoneNum: phoneNumValue,
      phoneAreaText: app.globalData.phoneAreaValue,  //显示在cell
      phoneAreaValue: [app.globalData.phoneAreaValue],  //显示在picker
      maxphonenum: (app.globalData.phoneAreaValue=="+86") ? 11 : 8,
      wechatID: app.globalData.wechatID,
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