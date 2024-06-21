import TabMenu from './data';
var app = getApp()
Component({
  data: {
    active: app.globalData.tabbarActive,
    list: TabMenu,
    isShow:1
  },
  methods: {
    onChange(event) {
      const url = this.data.list[event.detail.value].url.startsWith('/')
      ? this.data.list[event.detail.value].url
      : `/${this.data.list[event.detail.value].url}`;
      const that = this
      wx.switchTab({
        url,
        success:function(){
          wx.vibrateShort({
            type:"light"
          })
         },
        fail:function(error) {
          console.error('Failed to switch tab:', error);
        }
      })
    },
  },
  // lifetimes:{
  //   attached(){
  //   },
  //   show:function(){
  //   }
  // },
});