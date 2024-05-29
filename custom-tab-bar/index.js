// custom-tab-bar/index.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

    value: 'label_1',
    list: [
      { value: 'label_1', icon: 'home', ariaLabel: '首页' },
      { value: 'label_2', icon: 'chat', ariaLabel: '聊天' },
      { value: 'label_3', icon: 'user', ariaLabel: '我的' },
    ],
    // url: [
    //   "/pages/activity/activity",
    //   "/packages/commnunity-package/pages/community/community",
    //   "/pages/personal/personal",
    // ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(e) {
      this.setData({
        value: e.detail.value,
      });
      console.log(e)
      const url = "/pages/activity/activity"
      wx.switchTab({url});
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
    },
  }
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