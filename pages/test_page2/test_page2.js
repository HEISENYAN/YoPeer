Page({ 
  data: {
    selectedArea:'+86',
    areas: [
      { label: '中国大陆 +86', value: '+86' },
      { label: '中国香港 +852', value: '+852' },
      { label: '中国澳门 +853', value: '+853' }
    ],
    showAreaPicker:false
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
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
  }
})