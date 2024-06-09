import Toast from 'tdesign-miniprogram/toast/index';
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
  data: {
    consigneeName: '',
    consigneePhoneNum: '',
    hallSelectNote1:'请选择宿舍',
    hallSelectNote2:'',
    maxphonenum: 11,
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
    phoneInput: [],
  },
  onPhoneInput(e) {
    this.setData({phoneInput: [e.detail.value.toString()]})
    // if (this.data.selectedArea === "+86") {
    //   const formattedValue = e.detail.value.toString().replace(/(\d{3})(\d{4})(\d+)/, '$1 $2 $3');
    //   this.setData({ maxphonenum: 13, phoneInput: [formattedValue] });
    // } 
    // else if(this.data.selectedArea === "+852"||this.data.selectedArea === "+853"){
    //   const formattedValue = e.detail.value.toString().replace(/(\d{4})(\d+)/, '$1 $2');
    //   this.setData({ maxphonenum: 9, phoneInput: [formattedValue] });
    // }
  },
  // showWarningToast(e) {

  // },
  checkNotNull(params) {  //检查非空字符，非空：返回true
    if (params === "" || params === null) return false;
    else return true;
  },
  checkSubmit(event){  //检查所有内容, 填完表单返回true
    var flag_hall = false;
    var flag_area = false;
    if(!this.data.selectedHallAddress.length==0)  flag_hall = true;  //判断宿舍住户表单
    if(this.data.selectedAreaAddress.length!=0 && this.checkNotNull(event.detail.value.areaStreet) && this.checkNotNull(event.detail.value.areaBuilding))  flag_area = true;  //判断校外住户表单
    if(this.checkNotNull(event.detail.value.consigneeName)&&this.checkNotNull(event.detail.value.consigneePhoneNum)&&(flag_hall||flag_area))  return true
    else return false
  },
  saveAddress(e){  
    if(this.checkSubmit(e)){// show toast
      this.setData({
        consigneeName: e.detail.value.consigneeName,
        consigneePhoneNum: e.detail.value.consigneePhoneNum,
        selectedAreaAddress: [this.data.selectedAreaAddress, e.detail.value.areaStreet, e.detail.value.areaBuilding, e.detail.value.areaHouseNum],
      })
      console.log("收货人：", this.data.consigneeName)
      console.log("手机号码：", this.data.selectedArea, this.data.consigneePhoneNum)
      if(!this.data.selectedHallAddress.includes(undefined)) console.log("宿舍地址: ", this.data.selectedHallAddress)
      if(!this.data.selectedAreaAddress.includes(undefined)) console.log("校外地址: ", this.data.selectedAreaAddress)
    }
    else{
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请将信息填写完整!',
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
    this.setData({
      selectedAddressType:e.target.dataset.selectedAddress,
      selectedHallAddress: [],
      hallSelectNote1:'请选择宿舍',
      selectedAreaAddress: [],
      areaSelectNote: '请选择地区',
    })
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