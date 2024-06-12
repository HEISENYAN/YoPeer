//import { RenderSystem } from "XrFrame/systems";

// pages/check-out-page/check-out-page.js
wx.cloud.init()
const hallAddress = [
  {
    value: '100000',
    label: '香港大学HKU',
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
    label: '香港中文大学CUHK',
    children: [
      { value: '200100', label: '汤若望宿舍' },
      { value: '200101', label: '伯利衡宿舍' },
      { value: '200102', label: '陈震夏宿舍' },
      { value: '200103', label: '恒生楼' },
    ],
  },
  {
    value: '300000',
    label: '香港科技大学HKUST',
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
    label: '香港理工大学PolyU',
    children: [
      { value: '400100', label: '何文田宿舍(佛光街15号)' },
      { value: '400101', label: '红磡宿舍(红荔道1号)' },
    ],
  },
  {
    value: '500000',
    label: '香港城市大学CityU',
    children: [
      { value: '500100', label: '九龙塘宿舍' },
      { value: '500101', label: '马鞍山宿舍' },
    ],
  },
  {
    value: '600000',
    label: '香港浸会大学BU',
    children: [
      { value: '600100', label: '浸会大学宿舍' },
    ],
  },
  {
    value: '700000',
    label: '香港岭南大学LNU',
    children: [
      { value: '700100', label: '南部宿舍' },
      { value: '700101', label: '赛马会宿舍' },
      { value: '700102', label: '黄虎泉堂和吴洁仪堂' },
    ],
  },
  {
    value: '800000',
    label: '香港教育大学EduHK',
    children: [
      { value: '800100', label: '罗富国堂' },
      { value: '800101', label: '葛亮洪堂' },
      { value: '800102', label: '柏立基堂' },
      { value: '800103', label: '赛马会学生宿舍' },
    ],
  }
];
const areaAddress = [
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
  }
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkOutInfo:[],
    checkOutPrice:0,
    offsetMargin:84,
    selectedArea:'+86',
    areas: [
      { label: '中国大陆 +86', value: '+86' },
      { label: '中国香港 +852', value: '+852' },
      { label: '中国澳门 +853', value: '+853' }
    ],
    showAreaPicker:false,
    selectedAddressType : 0,
    hallList:hallAddress,
    showHallCascadar: false,
    subTitles: ['请选择', '请选择', '请选择'],
    selectedHallAddress:'',
    showAreaCascadar: false,
    areaList:areaAddress,
    selectedAreaAddress:'',
    receiverInfo:{},
    addressText: null,
    currentStep:0,
    phoneText: null,
    nameText: null,
    // 预计收获时间 参数
    mode: '',
    dateVisible: false,
    date: new Date().getTime(), // 支持时间戳传入  Date('2021-12-23')
    dateText: '',
    start: '2024-08-20 00:00:00',
    end: '2024-09-05 23:59:59',
    //结算时弹出框
    cur: {},
    position: [
      { value: 'top', text: '顶部弹出' },
      { value: 'left', text: '左侧弹出' },
      { value: 'center', text: '中间弹出' },
      { value: 'bottom', text: '底部弹出' },
      { value: 'right', text: '右侧弹出' },
    ],
    CheckoutPopupContent: '',
  },
  onCheckout(){
    const that = this
    const tradeNumber = Math.round(Math.random() * (10 ** 13)) + Date.now()//生成随机订单号
    wx.cloud.callFunction({
      name: 'cloudbase_module',
      data: {
        // 工作流ID, 需从工作流属性中获取
        name: 'sywxzfapifqzf_9cfe90e',
        data: {
          /**
           * 注：appid 和 mchid 工作流已自动注入，无需传递
           * 本示例只传递了必要的参数，其他详细参数可参考微信支付文档：
           * https://pay.weixin.qq.com/docs/merchant/apis/mini-program-payment/mini-prepay.html
           */
          description: "鱼饼优选-测试产品",
          // 商户订单号，业务自行生成，此处仅为示例
          out_trade_no: tradeNumber,
          amount: {
            total: parseInt(that.data.checkOutPrice*100),
            currency: "CNY"
          }
        }
      },
      success: res => {
        console.log('下单结果: ', res);
        // 获取到预付单信息
        const paymentData = res.result?.data;
        // 唤起微信支付组件，完成支付
        wx.requestPayment({
          timeStamp: paymentData?.timeStamp,
          nonceStr: paymentData?.nonceStr,
          package: paymentData?.packageVal,
          paySign: paymentData?.paySign,
          signType: "RSA", // 
          success(res) {
            console.log('唤起支付组件成功：', res);
            wx.cloud.callFunction({
              name:"orderSettlement",
              data:{
                expectedDate: that.data.dateText,
                tradeNumber:tradeNumber,
                timeStamp:paymentData?.timeStamp,
                productInfo:that.data.checkOutInfo
              },
              success: function(res){
                wx.showToast({
                  title: '下单已成功',
                  icon:"success",
                  duration:3000
                })
              },
              fail: function(res){
                console.log(res)
              }
            })
          },
          fail(err) {
            // 支付失败回调
            console.error('唤起支付组件失败：', err);
            wx.showToast({
              title: '支付失败请重试',
              icon: "error",
            })
          }
        });
      },
      fail: err =>{
        wx.showToast({
          title: '支付失败请重试',
          icon:"error"
        })
      }
    })
  },
  // 结算时弹出框 开始
  checkoutPopup(e) {
    const { item } = e.currentTarget.dataset;
    if(this.data.addressText && this.data.dateText){
      this.setData({
        visible: true,
        CheckoutPopupContent: "收货人：" + this.data.nameText+ "\n联系电话："+this.data.phoneText+"\n收货地址："+ this.data.addressText +"\n取货时间：" + this.data.dateText
      });
    }
    else{
      wx.showToast({
        title: '请完善收货信息',
        icon:"error",
        duration:2000
      })
    }
    

  },
  onVisibleChange(e) {
    this.setData({
      visible: e.detail.visible,
    });
  },
  onClose() {
    this.setData({visible: false,});
  },
// 结算时弹出框 结束


  // 预计收获时间 开始
  showDatePicker(e) {
    const { mode } = e.currentTarget.dataset;
    this.setData({
      mode,
      [`${mode}Visible`]: true,
    });
  },
  hideDatePicker() {
    const { mode } = this.data;
    this.setData({
      [`${mode}Visible`]: false,
    });
  },
  onDateConfirm(e) {
    const { value } = e.detail;
    const { mode } = this.data;
    console.log('select date ', value);
    this.setData({
      [mode]: value,
      [`${mode}Text`]: value,
    });
    this.hideDatePicker();
  },
// 预计收获时间 结束
  onSelectArea(){
    this.setData({
      showAreaPicker:true
    })
  },
  onChangeArea(e){
    this.setData({
      selectedArea:e.detail.value[0]
    })
    console.log(e)
  },
  onSelectAdress(e){
    this.setData({
      selectedAddressType:e.target.dataset.selectedAddress
    })
  },
  onEditAddress(){
    wx.navigateTo({
      url: '../receive-info-edit/receive-info-edit',
    })
  },
  onOpenCascader(){
    this.setData({
      showHallCascadar:this.data.selectedAddressType == 0?true:false,
      showAreaCascadar:this.data.selectedAddressType == 1?true:false
    })
  },
  onChangeHallAdress(e){
    this.setData({
      selectedHallAddress: e.detail.selectedOptions[0].label + " "+ e.detail.selectedOptions[1].label
    })
  },
  onChangeAreaAdress(e){
    this.setData({
      selectedAreaAddress: e.detail.selectedOptions[0].label + " "+ e.detail.selectedOptions[1].label
    })
  },
  onClickNext(){
    wx.navigateTo({
      url: '../receive-info-edit/receive-info-edit',
    })
  },
  goPreviousStep() {
    if (this.data.currentStep > 0) {
      this.setData({
        currentStep: this.data.currentStep - 1,
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var cart = new Object()
    var totalPrice = 0
    var cartInfo = []
    const that = this
    wx.getStorage({
      key:"ypCart",
      success:function(res){
        for(let i in res.data){
          cart.specificOptions = ''
          totalPrice += res.data[i].price * res.data[i].selectedNum
          cart.prodName = res.data[i].prodName
          cart.price = res.data[i].price
          cart.selectedNum = res.data[i].selectedNum
          cart.optionName = res.data[i].optionName
          cart.selectedItem = res.data[i].selectedItem
          for(let j in res.data[i].optionName){
            cart.specificOptions += res.data[i].optionName[j] + ':' + res.data[i].selectedItem[j]
          }
          cartInfo.push(cart)
        }
        console.log(cartInfo)
        that.setData({
          checkOutInfo: cartInfo,
          checkOutPrice:totalPrice
        })
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
    const that = this
    var address = ''
    wx.getStorage({
      key:"ypReceiveInfo",
      success:function(res){
        for(let i in res.data.receiveAddress){
          address += res.data.receiveAddress[i]
        }
        console.log(address)
        that.setData({
          addressText:address,
          phoneText:res.data.receivePhoneNumber,
          nameText:res.data.receiveName
        })
      }
    })
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