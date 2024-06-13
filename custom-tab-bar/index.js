import TabMenu from './data';
Component({
  data: {
    active: 2,
    list: TabMenu,
  },
  methods: {
    onChange(event) {
      
      const url = this.data.list[event.detail.value].url.startsWith('/')
      ? this.data.list[event.detail.value].url
      : `/${this.data.list[event.detail.value].url}`;
      wx.switchTab({
        url,
        success: () =>{
          var activeValue = event.detail.value
          this.setData({ active: activeValue });
          console.log("switched to ", activeValue)
        },
        fail: function(error) {
          console.error('Failed to switch tab:', error);
        }
      })
      
      // this.switchTabAsync(url)
      // .then(() => {
      //   console.log("active: ", event.detail.value)
      //   this.setData({ active: event.detail.value });
      // })
      // .catch(err => {
      //   console.error('切换标签页失败', err);
      // });
      // this.setData({ active: event.detail.value });
      // console.log("pagePath: ", url)
      // wx.switchTab({url})
      // wx.switchTab({
      //   url: this.data.list[event.detail.value].url.startsWith('/')
      //     ? this.data.list[event.detail.value].url
      //     : `/${this.data.list[event.detail.value].url}`,
      // });
      // this.init(event);
      // console.log("change link to " + this.data.list[event.detail.value].url)
      // console.log(event.detail.value)
    },
    // switchTabAsync(url) {
    //   return new Promise((resolve, reject) => {
    //     wx.switchTab({
    //       url,
    //       success: () => resolve(),
    //       fail: err => reject(err)
    //     });
    //     console.log("switched to ", url)
    //   });
    // },
    // onShow() {
    //   const page = getCurrentPages().pop();
    //   const route = page ? page.route.split('?')[0] : '';
    //   const active = this.data.list.findIndex(
    //     (item) =>
    //       (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
    //       `${route}`,
    //   );

    //   this.setData({active});

    //   // this.data.active = event.detail.value;
    //   // wx.switchTab({
    //   //   url: this.data.list[event.detail.value].url.startsWith('/')
    //   //     ? this.data.list[event.detail.value].url
    //   //     : `/${this.data.list[event.detail.value].url}`,
    //   // });
    //   // this.setData({ active: event.detail.value });
    //   // console.log("active: ", this.data.active)
    // },
  },
  lifetimes:{
    attached(){
      console.log("ready")
      // this.setData({ active });
    }
  },
});