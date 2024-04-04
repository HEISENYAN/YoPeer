// pages/shop/shop.js
const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}
const { shared, timing } = wx.worklet

Component({

  /**
   * 页面的初始数据
   */
  data: {
    indexSize: "1", // 当前点击
    indicatorDots: false, // 是否显示面板指示点
    autoplay: false,  // 是否自动切换
    duration: 0,  // 滑动动画时长
    scrollIntoView: "",
    headerTop:0,
    detail:[
      {"children":[{"id":"14","name":"套餐A",},{"id":"13","name":"套餐B",},{"id":"13","name":"套餐C",},{"id":"13","name":"套餐D",},{"id":"13","name":"套餐E",},{"id":"13","name":"套餐F",}
      ,{"id":"13","name":"套餐G",}
      ,{"id":"13","name":"套餐H",},{"id":"13","name":"套餐I"},{"id":"13","name":"套餐J"},{"id":"13","name":"套餐K"}],"id":"1","name":"套餐",},
      {"children":[{"id":"24","name":"被子",},{"id":"23","name":"床品三件套",},{"id":"22","name":"枕头",},{"id":"21","name":"床垫",}],"id":"2","name":"床品",},
      {"children":[{"id":"24","name":"牙刷",},{"id":"24","name":"毛巾",},{"id":"24","name":"洗脸盆",},{"id":"24","name":"牙膏",},{"id":"24","name":"洗衣凝珠",},{"id":"24","name":"除湿袋",}],"id":"3","name":"生活用品",},
      {"children":[{"id":"24","name":"吹风机",},{"id":"24","name":"手机支架",},{"id":"24","name":"收纳盒",},{"id":"24","name":"显示器",},{"id":"24","name":"转换插头",},{"id":"24","name":"挂钩",},{"id":"24","name":"插板",}],"id":"4","name":"其它",}] // 分类集合
  },
  methods:{
    returnPage: function(){
      wx.navigateBack({
        url:"/pages/activity/activity"
      })
      console.log("clicked")
    },
    chooseTypes: function(e) {
      this.setData({
        scrollIntoView:"#menuIndex" + e.target.dataset.index,
        indexSize:e.target.dataset.index
      })
    },
    scrollDetection: function(e) {
      for (let i in this.data.detail) {
        const query = wx.createSelectorQuery();
        query.select("#menuIndex" + this.data.detail[i].id).boundingClientRect();
        let that = this;
        query.selectViewport().scrollOffset();
        query.exec(function(index, res) {
          if (parseInt(res[0].top) === that.data.headerTop) {
            that.setData({
              indexSize: that.data.detail[index].id
            });
          }
        }.bind(null, i));
      }
    },
    chooseSecondMenu: function(e){
      let cId = e.target.dataset.cid;
      let cName = e.target.dataset.cname;
      console.log(e);
      wx.navigateTo({
          url:"../productDetail/productDetail?detail=" + e.target.dataset.cname,
        })
    }
    

  },
  lifetimes:{
    created(){

    },
    ready(options){
      const query = wx.createSelectorQuery();
      query.select("#menuIndex1").boundingClientRect();
      query.selectViewport().scrollOffset();
      let that = this;
      query.exec(function(res){
      //console.log(res[0].top)
        that.setData({
          headerTop:parseInt(res[0].top)
        })
      });
    }
  }
})