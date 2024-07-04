//import { RenderSystem } from "XrFrame/systems";
import {hallAddress, areaAddress, pickDateList} from './data'
wx.cloud.init()
var Price = 0;
var actualPrice = 0;
const yopeerVoucher =  ["YoPeer2024","HongKong2024","PolyU2024","CityU2024","HKU2024","CUHK2024","HKUST2024","LNU2024","EduHK2024","HKBU2024","YP2024","MRY2024","FIRSTYP","2024YP","2024YoPeer"]

const getOptions = (obj, filter) => {
  const res = Object.keys(obj).map((key) => ({ value: key, label: obj[key] }));
  if (filter) {
    return res.filter(filter);
  }
  return res;
};
const match = (v1, v2, size) => v1.toString().slice(0, size) === v2.toString().slice(0, size);


Page({
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
    finalPrice:0,

    // 预计收获时间 参数
    // mode: '',
    // dateVisible: false,
    // date: new Date().getTime(), // 支持时间戳传入  Date('2021-12-23')
    // dateText: '',
    // start: '2024-08-20 00:00:00',
    // end: '2024-09-05 23:59:59',
    dateText: '',
    dateValue: [],
    years: getOptions(pickDateList.years),
    months: [],
    days: [],

    //结算时弹出框
    CheckoutPopupContent: '',

    // 优惠码
    promotionCode: '',
    marquee1: {
      speed: 60,
      loop: -1,
      delay: 0,
    },
  },

  //  取货时间 开始
  onColumnChange(e) {
    console.log('pick:', e.detail);
    const { column, index } = e.detail;
    const { years, months } = this.data;
    if (column === 0) {  //年
      const { months, days } = this.getMonths(years[index].value);
      this.setData({ months, days });
    }
    if (column === 1) {  //月
      const days = this.getDays(months[index].value);
      this.setData({ days });
    }
    if (column === 2) {
    }
  },
  getMonths(provinceValue) {
    const months = getOptions(pickDateList.months, (city) => match(city.value, provinceValue, 2));
    const days = this.getDays(months[0].value);
    return { months, days };
  },
  getDays(cityValue) {
    return getOptions(pickDateList.days, (county) => match(county.value, cityValue, 4));
  },
  onPickerChange(e) {
    const { value, label } = e.detail;
    console.log('picker confirm:', e.detail);
    this.setData({
      dateVisible: false,
      dateValue: value,
      dateText: label.join('-'),
    });
  },
  onPickerCancel(e) {
    console.log('picker cancel', e.detail);
    this.setData({
      dateVisible: false,
    });
  },
  onDatePicker() {
    this.setData({ dateVisible: true });
  },
  //  取货时间 结束

  setPromotionCode(e){
    //console.log(e.detail.value)
    const that = this
    this.setData({
      promotionCode: e.detail.value
    },()=>{
      if(yopeerVoucher.includes(this.data.promotionCode) && Price >= 5){
        if(getApp().globalData.isVoucher == true){
          wx.showModal({
            title: '优惠已使用',
            content: '您已使用过优惠，无法再次使用',
            complete: (res) => {
              that.setData({
                promotionCode:''
              })
            }
          })
        }
        else{
          actualPrice = Price - 3//减少价格 单位分
          this.setData({
            finalPrice:actualPrice
          })
        }
      }
      else{
        actualPrice = Price//减少价格 单位分
        this.setData({
          finalPrice:actualPrice
        })
      }
    })
  },
  onCheckout(){
    const that = this
    const tradeNumber = Math.round(Math.random() * (10 ** 13)) + Date.now()//生成随机订单号
    this.setData({
      visible:false
    })
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
            total: actualPrice,
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
                productInfo:that.data.checkOutInfo,
                paidPrice:actualPrice,
                totalPrice:Price,
                isDiscount: !(Price == actualPrice),
                voucher:that.data.promotionCode
              },
              success: function(res){
                wx.showModal({
                  title: '下单成功',
                  content: '您可前往个人中心->我的团购订单内查看已支付订单',
                  success (res) {
                    wx.removeStorage({
                      key: 'ypCart'
                    })
                    wx.reLaunch({
                      url: '/pages/activity/activity'
                    })
                  }
                })
                
              },
              fail: function(res){
                console.log(res)
              }
            })
          },
          fail(err) {
            // 支付失败回调
            console.error('唤起支付组件失败：', err,res);
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
      console.log("优惠码:", this.data.promotionCode)
      this.setData({
        visible: true,
        CheckoutPopupContent: "收货人：" + this.data.nameText+ "\n联系电话："+this.data.phoneText+"\n收货地址："+ this.data.addressText +"\n取货时间：" + this.data.dateText
      });
    }
    else if(!(this.data.addressText||this.data.dateText)){
      wx.showToast({
        title: '请完善收货信息',
        icon:"error",
        duration:2000
      })
    }
    else if(!this.data.addressText){
      wx.showToast({
        title: '请填写收货地址',
        icon:"error",
        duration:2000
      })
    }
    else if (!this.data.dateText){
      wx.showToast({
        title: '请填写收货时间',
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
  // showDatePicker(e) {
  //   const { mode } = e.currentTarget.dataset;
  //   this.setData({
  //     mode,
  //     [`${mode}Visible`]: true,
  //   });
  // },
  // hideDatePicker() {
  //   const { mode } = this.data;
  //   this.setData({
  //     [`${mode}Visible`]: false,
  //   });
  // },
  // onDateConfirm(e) {
  //   const { value } = e.detail;
  //   const { mode } = this.data;
  //   console.log('select date ', value);
  //   this.setData({
  //     [mode]: value,
  //     [`${mode}Text`]: value,
  //   });
  //   this.hideDatePicker();
  // },
// 预计收获时间 结束


  // onSelectArea(){
  //   this.setData({
  //     showAreaPicker:true
  //   })
  // },
  // onChangeArea(e){
  //   this.setData({
  //     selectedArea:e.detail.value[0]
  //   })
  //   console.log(e)
  // },
  // onSelectAdress(e){
  //   this.setData({
  //     selectedAddressType:e.target.dataset.selectedAddress
  //   })
  // },
  onEditAddress(){
    wx.navigateTo({
      url: '../receive-info-edit/receive-info-edit',
    })
  },
  // onOpenCascader(){
  //   this.setData({
  //     showHallCascadar:this.data.selectedAddressType == 0?true:false,
  //     showAreaCascadar:this.data.selectedAddressType == 1?true:false
  //   })
  // },
  // onChangeHallAdress(e){
  //   this.setData({
  //     selectedHallAddress: e.detail.selectedOptions[0].label + " "+ e.detail.selectedOptions[1].label
  //   })
  // },
  // onChangeAreaAdress(e){
  //   this.setData({
  //     selectedAreaAddress: e.detail.selectedOptions[0].label + " "+ e.detail.selectedOptions[1].label
  //   })
  // },
  // onClickNext(){
  //   wx.navigateTo({
  //     url: '../receive-info-edit/receive-info-edit',
  //   })
  // },
  // goPreviousStep() {
  //   if (this.data.currentStep > 0) {
  //     this.setData({
  //       currentStep: this.data.currentStep - 1,
  //     });
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    var totalPrice = 0
    var cartInfo = []
    const that = this
    wx.getStorage({
      key:"ypCart",
      success:function(res){
        for(let i in res.data){
          var cart = new Object()
          cart.specificOptions = ''
          totalPrice += res.data[i].price * res.data[i].selectedNum
          cart.prodName = res.data[i].prodName
          cart.price = res.data[i].price
          cart.selectedNum = res.data[i].selectedNum
          cart.optionName = res.data[i].optionName
          cart.selectedItem = res.data[i].selectedItem
          cart.thumbnailUrl = res.data[i].thumbnailUrl
          cart.optionID = res.data[i].optionID
          for(let j in res.data[i].optionName){
            cart.specificOptions += res.data[i].optionName[j] + ':' + res.data[i].selectedItem[j]+"；"
          }
          cartInfo.push(cart)
        }
        console.log(cartInfo)
        Price = totalPrice
        actualPrice = totalPrice
        that.setData({
          checkOutInfo: cartInfo,
          checkOutPrice: totalPrice,
          finalPrice:totalPrice
        })
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    const { years } = this.data;
    const { months, days } = this.getMonths(years[0].value);
    this.setData({ months, days });
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
          address += res.data.receiveAddress[i]+" "
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