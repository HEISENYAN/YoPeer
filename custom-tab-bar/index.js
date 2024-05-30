import TabMenu from './data';
Component({
  data: {
    active: 0,
    list: TabMenu,
    // value: 'label_1',
    // list: [
    //   { value: 'label_1', icon: 'home', ariaLabel: '首页' },
    //   { value: 'label_2', icon: 'chat', ariaLabel: '聊天' },
    //   { value: 'label_3', icon: 'user', ariaLabel: '我的' },
    // ],

  },

  methods: {
    // onChange(e) {
    //   this.setData({
    //     value: e.detail.value,
    //   });
    //   console.log(e)
    //   const url = "/pages/activity/activity"
    //   wx.switchTab({url});
      // const url = "/pages/personal/personal"
      // const url1 = "/pages/activity/activity"
      // const url2 = "/packages/commnunity-package/pages/community/community";
      // const url3 = "/pages/personal/personal";
      // wx.switchTab({url1});
      // if(e.detail.value=="label_1")  {
      //   console.log("tab 1")
      //   wx.switchTab({url1});
      // }
      // if(e.detail.value=="label_2")  wx.switchTab({url2});
      // if(e.detail.value=="label_3")  wx.switchTab({url3});
      onChange(event) {
        this.setData({ active: event.detail.value });
        wx.switchTab({
          url: this.data.list[event.detail.value].url.startsWith('/')
            ? this.data.list[event.detail.value].url
            : `/${this.data.list[event.detail.value].url}`,
        });
        console.log(event.detail.value)
      },
      init() {
        const page = getCurrentPages().pop();
        const route = page ? page.route.split('?')[0] : '';
        const active = this.data.list.findIndex(
          (item) =>
            (item.url.startsWith('/') ? item.url.substr(1) : item.url) ===
            `${route}`,
        );
        this.setData({ active });
      },
    },
  // methods: {
  //   onChange(e) {
  //     this.setData({
  //       value: e.detail.value,
  //     });
  //     console.log(e)
  //     // url = "/pages/personal/personal"
  //     const url = "/pages/activity/activity"
  //     wx.switchTab({url});
  //   },
  // }

})