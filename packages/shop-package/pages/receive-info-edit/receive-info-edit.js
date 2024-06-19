import Toast from 'tdesign-miniprogram/toast/index';
import {hallAddress, areaAddress} from './data'
wx.cloud.init();
var app = getApp()
Page({ 
  data: {
    delta: 0,  //返回后退层数
    consigneeName: '',
    consigneeNameValue: '',  //表单显示
    consigneePhoneNum: '',
    consigneePhoneNumValue: '',  //表单显示
    hallSelectNote1:'请选择宿舍',
    hallSelectNote2:'',
    // 手机号码区号
    maxphonenum: 11,
    selectedArea:'+86',
    areas: [
      { label: '中国大陆 +86', value: '+86' },
      { label: '中国香港 +852', value: '+852' },
      { label: '中国澳门 +853', value: '+853' }
    ],
    showAreaPicker:false,

    selectedAddressType : 0,  //宿舍住户/校外住户
    hallList:hallAddress,
    showHallCascadar: false,
    subTitles_hall: ['请选择大学', '请选择宿舍'],
    subTitles_area: ['请选择', '请选择'],
    selectedHallAddress:[],
    showAreaCascadar: false,
    areaList:areaAddress,
    selectedAreaAddress:[],
    areaSelectNote: '请选择地区',
    areaStreet: '',
    areaBuilding: '',
    areaHouseNum: '',
    receiverInfo:{},

    // 用户返回时，临时存储
    // temp_consigneeName: '',
    // temp_consigneePhoneNum: '',
    // temp_areaStreet: '',
    // temp_areaBuilding: '',
    // temp_areaHouseNum: '',
  },

  // 返回时弹窗 //
  showDialog(e) {  //点击返回时显示弹窗
    this.setData({
      visible: true,
    })
    const tempAddress = {
      temp_consigneeName: this.data.consigneeName,
      temp_consigneePhoneNum: this.data.consigneePhoneNum,
      temp_areaStreet: this.data.areaStreet,
      temp_areaBuilding: this.data.areaBuilding,
      temp_areaHouseNum: this.data.areaHouseNum,
    }
    wx.setStorage({
      key: 'tempAddress',
      data: tempAddress
    })
    console.log("temp_consigneeName", this.data.consigneeName)
    console.log("temp_consigneePhoneNum", this.data.consigneePhoneNum)
    console.log("temp_areaStreet", this.data.areaStreet)
    console.log("temp_areaBuilding", this.data.areaBuilding)
    console.log("temp_areaHouseNum", this.data.areaHouseNum)
  },
  onVisibleChange(e) {  //点击空白处取消弹窗
    this.setData({
      visible: e.detail.visible,
    });
  },
  onShow() {
    
    const that = this
    wx.getStorage({
      key: 'tempAddress',
      success(res) {
        console.log(res.data.temp_consigneeName);
        console.log(res.data.temp_consigneePhoneNum);
        console.log(res.data.temp_areaStreet);
        console.log(res.data.temp_areaBuilding);
        console.log(res.data.temp_areaHouseNum);
        that.setData({
          consigneeName: res.data.temp_consigneeName,
          consigneeNameValue: res.data.temp_consigneeName,
          consigneePhoneNum: res.data.temp_consigneePhoneNum,
          consigneePhoneNumValue: res.data.temp_consigneePhoneNum,
        });
      },
      fail(){
        console.log("failed..")
        that.setData({
          consigneeName: app.globalData.consigneeName,
          consigneeNameValue: (app.globalData.consigneeName=="请填写收货人姓名")?"":app.globalData.consigneeName,
          consigneePhoneNum: app.globalData.consigneePhoneNum,
          consigneePhoneNumValue: (app.globalData.consigneePhoneNum=="请填写收货人手机号码")?"":app.globalData.consigneePhoneNum,
        });
      }
    })
    // wx.removeStorage({key: 'tempAddress'})

  },

  onFormChange(e) { //temp
    const content = e.detail.value
    const key = e.target.dataset.field
    if(key=="name")  this.data.consigneeName = content
    else if(key=="phone") this.data.consigneePhoneNum = content
    else if(key=="street") this.data.areaStreet = content
    else if(key=="building") this.data.areaBuilding = content
    else if(key=="house") this.data.areaHouseNum = content

    // if (this.data.selectedArea === "+86") {
    //   const formattedValue = e.detail.value.toString().replace(/(\d{3})(\d{4})(\d+)/, '$1 $2 $3');
    //   this.setData({ maxphonenum: 13, phoneInput: [formattedValue] });
    // } 
    // else if(this.data.selectedArea === "+852"||this.data.selectedArea === "+853"){
    //   const formattedValue = e.detail.value.toString().replace(/(\d{4})(\d+)/, '$1 $2');
    //   this.setData({ maxphonenum: 9, phoneInput: [formattedValue] });
    // }
  },
  noSave(){  //返回不保存
    wx.navigateBack()
  },
  save(){  //返回并保存
    wx.navigateBack()

    // if(!this.checkNotNull(this.data.consigneeName))  console.log("null 1")
    // console.log(this.data.selectedAreaAddress)
    // if(this.data.selectedAreaAddress.length==0)  console.log("null 1")
  },
  checkNotNull(params) {  //检查非空字符，非空：返回true
    if (params === "" || params === null) return false;
    else return true;
  },
  checkSubmit(event){  //检查所有内容, 填完表单返回true
    var flag_hall = false;
    var flag_area = false;
    // console.log(event.detail.value.consigneePhoneNum.length)
    if(!this.data.selectedHallAddress.length==0)  flag_hall = true;  //判断宿舍住户表单
    if(this.data.selectedAreaAddress.length!=0 && this.checkNotNull(event.detail.value.areaStreet) && this.checkNotNull(event.detail.value.areaBuilding))  flag_area = true;  //判断校外住户表单
    if(this.checkNotNull(event.detail.value.consigneeName)&&this.checkNotNull(event.detail.value.consigneePhoneNum)&&(flag_hall||flag_area))  return true
    else return false
  },
  checkPhoneNum(event){
    if(event.detail.value.consigneePhoneNum.length==this.data.maxphonenum) return true
    else return false
  },
  saveAddress(e){
    // wx.cloud.callFunction({
    //   name:"getReceiveInfo",
    //   success(res){
    //     console.log("res1")
    //     console.log(res)
    //   },
    //   fail(){
    //     console.log("res2")
    //     console.log(res)
    //   }
    // })
    console.log(e)
    if(this.checkSubmit(e)&&this.checkPhoneNum(e)){
      var ifHallResident = 0
      var address = ''
      const that = this
      this.setData({
        consigneeName: e.detail.value.consigneeName,
        consigneeNameValue: e.detail.value.consigneeName,
        consigneePhoneNum: e.detail.value.consigneePhoneNum,
        consigneePhoneNumValue: e.detail.value.consigneePhoneNum,
        selectedAreaAddress: [this.data.selectedAreaAddress, e.detail.value.areaStreet, e.detail.value.areaBuilding, e.detail.value.areaHouseNum],
      },()=>{
        console.log("收货人：", this.data.consigneeName)
        console.log("手机号码：", this.data.selectedArea, this.data.consigneePhoneNum)
        if(!this.data.selectedHallAddress.includes(undefined)){
          console.log("宿舍地址: ", this.data.selectedHallAddress)
          address = this.data.selectedHallAddress
          ifHallResident = 0
        }
        if(!this.data.selectedAreaAddress.includes(undefined)){
          console.log("校外地址: ", this.data.selectedAreaAddress)
          address = this.data.selectedAreaAddress
          ifHallResident = 1
        }
        app.globalData.consigneeName = this.data.consigneeName
        app.globalData.consigneePhoneNum = this.data.consigneePhoneNum
        //收货地址传入数据库
        wx.cloud.callFunction({
          name:"setReceiveInfo",
          data:{
            receiveName:that.data.consigneeName,
            receivePhoneNumber: that.data.selectedArea +" "+ that.data.consigneePhoneNum,
            receiveAddress:address,
            ifHallResident:ifHallResident
          },
          success:function(res){//成功回调
            wx.setStorage({
              key:'ypReceiveInfo',
              data:{
                receiveName:that.data.consigneeName,
                receivePhoneNumber:that.data.selectedArea+ " " + that.data.consigneePhoneNum,
                receiveAddress:address,
                ifHallResident:ifHallResident
              },
              success:function(){
                wx.navigateBack()
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration:2000
                })
              }
            })
          },
          fail:function(err){//失败回调
            wx.showToast({
              title: "出错",
              icon:"error",
              duration:2000
            })
          }
        })
      })
    }
    else if(!this.checkSubmit(e)){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请将信息填写完整!',
        theme: 'warning',
        direction: 'row',
        placement: 'bottom'
      });
    }
    else if(!this.checkPhoneNum(e)){
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入正确的手机号!',
        theme: 'warning',
        direction: 'row',
        placement: 'bottom'
      });
    }
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  onSelectArea(){  //点击区号
    this.setData({showAreaPicker:true})
  },
  onChangeArea(e){  //选择手机号码区号
    this.setData({selectedArea:e.detail.value[0]})
    if(e.detail.value[0]=="+852"||e.detail.value[0]=="+853")  this.setData({maxphonenum: 8})
    else if (e.detail.value[0]=="+86")  this.setData({maxphonenum: 11})
  },
  onSelectAddress(e){  //宿舍住户，校外住户切换
    if(e.target.dataset.selectedAddress!=this.data.selectedAddressType) {  //校内校外切换时，清空选择
      this.setData({
        selectedHallAddress: [],
        selectedAreaAddress: [],
        hallSelectNote1:'请选择宿舍',
        areaSelectNote: '请选择地区',
      });
    }
    this.setData({
      selectedAddressType:e.target.dataset.selectedAddress,
    });
  },
  onOpenCascader(){  //级联选择器展示（宿舍住户，校外住户共用）
    this.setData({
      showHallCascadar:this.data.selectedAddressType == 0?true:false,
      showAreaCascadar:this.data.selectedAddressType == 1?true:false
    })
  },
  onChangeHallAdress(e){  //宿舍住户 级联选择
    this.setData({
      selectedHallAddress: [e.detail.selectedOptions[0].label, e.detail.selectedOptions[1].label],
      hallSelectNote1: '',
      hallSelectNote2: `${e.detail.selectedOptions[0].label}\n${e.detail.selectedOptions[1].label}`
    })
  },
  onChangeAreaAdress(e){  //校外住户 级联选择
    this.setData({
      selectedAreaAddress: [e.detail.selectedOptions[0].label, e.detail.selectedOptions[1].label],
      areaSelectNote: [e.detail.selectedOptions[0].label, e.detail.selectedOptions[1].label]
    })
  },
})