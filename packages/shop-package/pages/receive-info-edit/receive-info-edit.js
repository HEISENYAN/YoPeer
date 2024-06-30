import Toast from 'tdesign-miniprogram/toast/index';
import {hallAddress, areaAddress, hallAddress_updated} from './data'
wx.cloud.init();
var app = getApp()
var ifHallResident = 0  // 0：宿舍；1：校外
var ifFormChange = 0  // 0: not changed; 1: changed
Page({ 
  data: {
    delta: 0,  //返回后退层数
    consigneeName: '',
    consigneeNameValue: '',  //表单显示
    consigneePhoneNum: '',
    consigneePhoneNumValue: '',  //表单显示

    // 手机号码区号
    maxphonenum: 11,
    selectedArea:'+86',
    areas: [
      { label: '中国大陆 +86', value: '+86' },
      { label: '中国香港 +852', value: '+852' },
      { label: '中国澳门 +853', value: '+853' }
    ],
    showAreaPicker:false,

    selectedAddressType : 0,  //0：宿舍住户；1：校外住户
    hallList:hallAddress_updated,
    showHallCascadar: false,
    subTitles_hall: ['请选择大学', '请选择宿舍'],
    subTitles_area: ['请选择', '请选择'],
    selectedHallAddress:[],
    showAreaCascadar: false,
    hallSelectNote1:'请选择宿舍',
    hallSelectNote2:'',
    
    areaList:areaAddress,
    selectedAreaAddress:[],
    areaSelectNote: '请选择地区',
    areaStreet: '',
    areaBuilding: '',
    areaHouseNum: '',
    receiverInfo:{},

  },

  // 返回时弹窗 //
  showDialog(e) {  //点击返回时显示弹窗
    if(ifFormChange==1){
      this.setData({visible: true,})
    }
    else{
      this.backWithoutSave()
    }
  },
  onVisibleChange(e) {  //点击空白处取消弹窗
    this.setData({
      visible: e.detail.visible,
    });
  },
  onShow() {
    ifFormChange = 0
    const that = this
    wx.getStorage({
      key: 'tempAddress',
      success(res) {
        console.log("加载缓存数据")
        const result = res.data // [temp_receiveName temp_receivePhoneNumber temp_ifHallResident temp_receiveAddress]
        // const phoneString = result.temp_receivePhoneNumber?.split(" ")??""
        const [phoneString_area = "", phoneString_number = ""] = result?.temp_receivePhoneNumber?.split(" ")??""
        that.setData({
          consigneeName: result.temp_receiveName,
          consigneeNameValue: result.temp_receiveName,
          selectedArea: phoneString_area,  //区号，显示在cell
          phoneAreaValue: [phoneString_area], //区号，显示在picker
          maxphonenum: (phoneString_area=="+86")?11:8,  //手机号码位数
          consigneePhoneNum: phoneString_number,
          consigneePhoneNumValue: phoneString_number,
          selectedAddressType: result.temp_ifHallResident,  //0:宿舍；1：校外
        });
        if(result.temp_ifHallResident==0){  // 校内
          that.setData({
            selectedHallAddress:[result.temp_receiveAddress[0], result.temp_receiveAddress[1], result.temp_receiveAddress[2]],//显示在picker
            hallSelectNote2: `${result.temp_receiveAddress[0]}\n${result.temp_receiveAddress[1]}\n${result.temp_receiveAddress[2]}`,//显示在cell
          })
        }
        else if(result.temp_ifHallResident==1){  // 校外
          that.setData({
            areaSelectNote: [result.temp_receiveAddress[0], result.temp_receiveAddress[1]],
            selectedAreaAddress: [result.temp_receiveAddress[0], result.temp_receiveAddress[1], result.temp_receiveAddress[2], result.temp_receiveAddress[3],result.temp_receiveAddress[4]],
            areaStreet: result.temp_receiveAddress[2],
            areaBuilding: result.temp_receiveAddress[3],
            areaHouseNum: result.temp_receiveAddress[4]
          })
        }
      },
      fail(){
        wx.cloud.callFunction({
          name:"getReceiveInfo",
          success(res){
            const result = res.result[0]
            console.log("加载云端数据")
            // const phoneString = result?.phoneNumber?.split(" ")??""
            const [phoneString_area = "+86", phoneString_number = ""] = result?.phoneNumber.split(" ")??""
            that.setData({
              consigneeName: result?.Name??"",
              consigneeNameValue: result?.Name??"",
              selectedArea: phoneString_area,  //区号，显示在cell
              phoneAreaValue: [phoneString_area], //区号，显示在picker
              maxphonenum: (phoneString_area=="+86")?11:8,  //手机号码位数
              consigneePhoneNum: phoneString_number,  //显示在cell
              consigneePhoneNumValue: phoneString_number,  //显示在picker
              selectedAddressType: result?.ifHallResident??0,  //0:宿舍；1：校外
            })
            if(that.data.selectedAddressType==0){  // 校内
              that.setData({
                selectedHallAddress:[result?.address[0]??"", result?.address[1]??"", result?.address[2]??""],//显示在picker
                // hallSelectNote2: `${result?.address[0]??""}\n${result?.address[1]??""}\n${result?.address[2]??""}`,//显示在cell
                hallSelectNote2: result?.address?.slice(0, 3).filter(Boolean).join('\n')||[],  //显示在cell
              })
            }
            else if(that.data.selectedAddressType==1){  // 校外
              that.setData({
                // areaSelectNote: [result?.address[0]??"", result?.address[1]??""],
                areaSelectNote: result?.address?.slice(0, 2).filter(Boolean) || [],
                areaStreet: result?.address[2]??"",
                areaBuilding: result?.address[3]??"",
                areaHouseNum: result?.address[4]??"",
                selectedAreaAddress: [result?.address[0]??"", result?.address[1]??"", result?.address[2]??"", result?.address[3]??"", result?.address[4]??""],
              })
            }
          },
          fail(){
            console.log("获取云端地址失败")
          }
        })
      }
    })
  },

  onFormChange(e) { //temp
    const content = e.detail.value
    const key = e.target.dataset.field
    if(key=="name")  this.data.consigneeName = content
    else if(key=="phone") this.data.consigneePhoneNum = content
    else if(key=="street"){
      this.data.areaStreet = content
      this.data.selectedAreaAddress[2] = content
    } 
    else if(key=="building"){
      this.data.areaBuilding = content
      this.data.selectedAreaAddress[3] = content
    }
    else if(key=="house"){
      this.data.areaHouseNum = content
      this.data.selectedAreaAddress[4] = content
    } 
    ifFormChange = 1
    // if (this.data.selectedArea === "+86") {
    //   const formattedValue = e.detail.value.toString().replace(/(\d{3})(\d{4})(\d+)/, '$1 $2 $3');
    //   this.setData({ maxphonenum: 13, phoneInput: [formattedValue] });
    // } 
    // else if(this.data.selectedArea === "+852"||this.data.selectedArea === "+853"){
    //   const formattedValue = e.detail.value.toString().replace(/(\d{4})(\d+)/, '$1 $2');
    //   this.setData({ maxphonenum: 9, phoneInput: [formattedValue] });
    // }
  },
  backWithoutSave(){  //返回不保存
    wx.navigateBack()
  },
  backSave(){  //返回并保存
    wx.navigateBack()
    var consigneePhoneNum = this.data.consigneePhoneNum ?? ""
    wx.setStorage({  //未填完整的地址放缓存
      key: 'tempAddress',
      data: {
        temp_receiveName:this.data.consigneeName,
        temp_receivePhoneNumber: this.data.selectedArea +" "+ this.data.consigneePhoneNum,
        temp_ifHallResident: this.data.selectedAddressType,
        temp_receiveAddress: this.data.selectedAddressType==0? this.data.selectedHallAddress: this.data.selectedAreaAddress,
      }
    })
    console.log("储存缓存数据，返回上一页...")

  },
  checkNotNull(params) {  //检查非空字符，非空：返回true
    if (params === "" || params === null) return false;
    else return true;
  },
  checkSubmit(event){  //检查所有内容, 填完表单返回true
    var hallAddress_Filled = false;
    var areaAddress_Filled = false;
    if(!this.data.selectedHallAddress.length==0)  hallAddress_Filled = true;  //判断宿舍住户表单

    if(this.data.selectedAreaAddress.length!=0 && this.checkNotNull(event.detail.value.areaStreet) && this.checkNotNull(event.detail.value.areaBuilding))  areaAddress_Filled = true;  //判断校外住户表单
    
    if(this.checkNotNull(event.detail.value.consigneeName)&&this.checkNotNull(event.detail.value.consigneePhoneNum)&&(hallAddress_Filled||areaAddress_Filled))  return true
    else return false
  },
  checkPhoneNum(event){
    if(event.detail.value.consigneePhoneNum.length==this.data.maxphonenum) return true
    else return false
  },
  saveAddress(e){
    wx.removeStorage({key: 'tempAddress'})  //清空缓存中的temp数据
    console.log(e)
    if(this.checkSubmit(e)&&this.checkPhoneNum(e)){
      ifHallResident = 0
      var address = ''
      const that = this
      this.setData({
        consigneeName: e.detail.value.consigneeName,
        consigneeNameValue: e.detail.value.consigneeName,
        consigneePhoneNum: e.detail.value.consigneePhoneNum,
        consigneePhoneNumValue: e.detail.value.consigneePhoneNum,
        // selectedAreaAddress: [this.data.selectedAreaAddress, e.detail.value.areaStreet, e.detail.value.areaBuilding, e.detail.value.areaHouseNum],
        'selectedAreaAddress[2]': e.detail.value.areaStreet,
        'selectedAreaAddress[3]': e.detail.value.areaBuilding,
        'selectedAreaAddress[4]': e.detail.value.areaHouseNum,

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
        console.log()
        app.globalData.consigneeName = this.data.consigneeName
        app.globalData.consigneePhoneNum = this.data.consigneePhoneNum
        //收货地址传入数据库
        wx.cloud.callFunction({
          name:"setReceiveInfo",
          data:{
            receiveName:that.data.consigneeName,
            receivePhoneNumber: that.data.selectedArea +" "+ that.data.consigneePhoneNum,
            receiveAddress: address,
            ifHallResident: ifHallResident
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
  onColumnChange() {
    wx.vibrateShort({type:"light"})
  },
  onChangePhoneArea(e){  //选择手机号码区号
    this.setData({
      selectedArea:e.detail.value[0],  //显示在cell
      phoneAreaValue: e.detail.value,  //显示在picker
    })
    if(e.detail.value[0]=="+852"||e.detail.value[0]=="+853")  this.setData({maxphonenum: 8})
    else if (e.detail.value[0]=="+86")  this.setData({maxphonenum: 11})
  },
  onSelectAddress(e){  //宿舍住户，校外住户切换
    wx.vibrateShort({type:"light"})
    // if(e.target.dataset.selectedAddress!=this.data.selectedAddressType) {  //校内校外切换时，清空选择
    //   this.setData({
    //     selectedHallAddress: [],
    //     selectedAreaAddress: [],
    //     hallSelectNote1:'请选择宿舍',
    //     areaSelectNote: '请选择地区',
    //   });
    // }
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
    ifFormChange = 1
    var cascade_thirdlayer = e.detail.selectedOptions[2]?.label??"";
    this.setData({
      selectedHallAddress: [e.detail.selectedOptions[0].label, e.detail.selectedOptions[1].label, cascade_thirdlayer],
      hallSelectNote1: '',
      hallSelectNote2: `${e.detail.selectedOptions[0].label}\n${e.detail.selectedOptions[1].label}\n${cascade_thirdlayer}`
    })
  },
  onChangeAreaAddress(e){  //校外住户 级联选择
    ifFormChange = 1
    this.setData({
      // selectedAreaAddress: [e.detail.selectedOptions[0].label, e.detail.selectedOptions[1].label],
      'selectedAreaAddress[0]': e.detail.selectedOptions[0].label,
      'selectedAreaAddress[1]': e.detail.selectedOptions[1].label,
      areaSelectNote: [e.detail.selectedOptions[0].label, e.detail.selectedOptions[1].label]
    })
  },
})