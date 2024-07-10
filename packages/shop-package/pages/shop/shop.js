// pages/shop/shop.js
const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}
const { shared, timing } = wx.worklet
wx.cloud.init()
const capsule = wx.getMenuButtonBoundingClientRect()
const endDate = 1723996800
Page({

  /**
   * 页面的初始数据
   */
  data: {
    capBottom: capsule.bottom,
    capWidth: capsule.width,
    capHeight: capsule.height,
    indexSize: 0, // 当前点击
    indicatorDots: false, // 是否显示面板指示点
    autoplay: false,  // 是否自动切换
    duration: 0,  // 滑动动画时长
    scrollIntoView: "",
    headerTop:0,
    selectedTotalPrice:0, // 已经选择物品的总价
    ifMaskOn: false,
    YPproduct:{},
    cartPrice:0,
    ypCart:[],
    isPopupVisible: false,
    cartFresh:true,
    cartItemCount: 0, // 用于存储购物车商品总数量
    marquee1: {
      speed: 80,
      loop: -1,
      delay: 0,
    }
  },
  onTapChange(){
    this.setData({
      scrollIntoView:"#menuIndex3",
      indexSize:3
    })
  },
  goBack(){
    wx.navigateBack()
  },
  onChangeStepper(e){
    //console.log(e.detail.value)
    const operatedItem = e.target.dataset.operatedItem
    const currentIndex =  e.target.dataset.currentIndex
    const that = this
    wx.getStorage({
      key: "ypCart",
      success:function(res){
        if(e.detail.value == 0){
          delete res.data[operatedItem.itemKey]
        }
        else{
          res.data[operatedItem.itemKey].selectedNum = e.detail.value
        }
        that.setData({
          cartPrice:that.data.cartPrice + (e.detail.value - operatedItem.selectedNum) * operatedItem.price,
          ["ypCart["+currentIndex+"].selectedNum"]: e.detail.value
        })
        console.log(that.data.ypCart)
        that.calculateCartItemCount();
        //that.setData({cartFresh:false},()=>{that.setData({cartFresh:true})})
        wx.setStorage({
          key:"ypCart",
          data:res.data
        })
      },
      fail:function(res){
        wx.showToast({
          title: '操作失败',
          icon: "error",
          duration: 15000
        })
      }
    })
  },
  showPopup: function() {
    wx.navigateTo({
      url: '/packages/shop-package/pages/protocols/purchaseNotes/purchaseNotes',
    })
  },

  closePopup: function() {
    this.setData({
      isPopupVisible: false
    });
  },
  returnPage: function(){
    wx.reLaunch({
      url: '/pages/activity/activity'
    })

  },
  chooseTypes: function(e) {
    this.setData({
      scrollIntoView:"#menuIndex" + e.target.dataset.nowindex,
      indexSize:e.target.dataset.nowindex
    })
  },
  closeCart: function(){
    const cart = this.selectComponent("#shoppingCart");
    cart.closeitem();
    this.setData({
      ifMaskOn: false
    })
  },
  openCart: function(){
    this.setData({
      ifMaskOn: true
    })
  },
  moveCart: function(){
    const cart = this.selectComponent("#shoppingCart");
    this.setData({
      ifMaskOn: cart.ifMaskOn.value
    })
  },
  scrollDetection: function(e) {
    for (var i = 0;i<this.data.YPproduct.length;i++) {
      const query = wx.createSelectorQuery();
      query.select("#menuIndex" + i).boundingClientRect();
      let that = this;
      query.selectViewport().scrollOffset();
      query.exec(function(index, res) {
        if (parseInt(res[0].top) === that.data.headerTop) {
          that.setData({
            indexSize: index
          });
        }
      }.bind(null, i));
    }
  },
  chooseSecondMenu: function(e){
    console.log(e)
    wx.navigateTo({
      url: '/packages/shop-package/pages/product-detail/product-detail?selected='+e.currentTarget.dataset.selected,
    })
  },
  checkOut: function(e){

    
    if(this.data.YPproduct[this.data.YPproduct.length - 1].classification == "团购已截止"){
      wx.showModal({
        title:"团购已截止",
        content:"2024港校新生团购已截止，感谢您的参与，如您已下单可至【个人中心->我的订单】查看已付款订单，有其它疑问请联系客服解决。"
      })
    }
    else if(this.data.cartPrice < 1){
      wx.showToast({
        title: '最低消费￥99',
        icon:"error"
      })
    }
    else{
      wx.navigateTo({
        url: '/packages/shop-package/pages/check-out-page/check-out-page?cartinfo='+ JSON.stringify(this.data.ypCart) + "&totalprice="+this.data.cartPrice,
      })
    }
    
  },
  onClearCart: function(){
    const that = this
    wx.removeStorage({
      key: "ypCart",
      success:function(){
        wx.showToast({
          title: '已清除购物车',
          icon: 'success',
          duration: 1000,
          success:function(){
            that.setData({
              cartPrice:0,
              ypCart:[]
            },()=>that.closeCart())
            that.calculateCartItemCount(); // 调用计算购物车商品总数量的函数
          }
        })
      },
      fail:function(){
        wx.showToast({
          title: '无法清除，请重试',
          icon: 'error',
          duration: 1000
        })
      }
    })
  },
  calculateCartItemCount() {
    let count = 0;
    this.data.ypCart.forEach(item => {
      count += item.selectedNum; // 假设 selectedNum 是商品数量
    });
    this.setData({
      cartItemCount: count
    });
  },
  onLoad(options){
    if(options.isShared){
      this.goBack = function(){
        wx.reLaunch({
          url: '/pages/activity/activity',
        })
      }
    }
    let that = this
    wx.cloud.callFunction({
      name: 'getProductList',
      success:function(res){
      //console.log(res.result.data.length)
      that.setData({
        YPproduct:res.result.data,
      },function(){
        const query = wx.createSelectorQuery();
        query.select("#menuIndex0").boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(function(res){
        that.setData({
          headerTop:parseInt(res[0].top)
        })
      })
    })
    },
      fail:function(res){
        //console.log(res)
        wx.showModal({
        title:"错误",
        content:"" + res
        })
      }
    });
  },
  onShow(){
    const that = this
    wx.getStorage({
      key:'ypCart',
      success:function(res){
        var totalPrice = 0
        var tempCart = []
        const matching = /YP\d+/
        for(let i in res.data){
          totalPrice += res.data[i].price * res.data[i].selectedNum
          tempCart.push({
            itemKey:i,
            selectedNum:res.data[i].selectedNum,
            price:res.data[i].price,
            prodName:res.data[i].prodName,
            selectedItem:res.data[i].selectedItem,
            optionName:res.data[i].optionName,
            thumbnailUrl:res.data[i].thumbnailUrl,
            optionID:res.data[i].optionID
          })
        }
        that.setData({
          cartPrice:totalPrice,
          ypCart:tempCart
        },()=>{console.log(that.data.ypCart)
          that.calculateCartItemCount(); // 调用计算购物车商品总数量的函数
          that.setData({cartFresh:false},()=>{that.setData({cartFresh:true})})})
      },
      fail:function(){
        that.setData({
          cartPrice:0
        })
      }
    })
  },
  onShareAppMessage:function(res) {
    return{
      title:"2024 鱼饼港校新生团购",
      imageUrl:"cloud://yopeer-0g9zeq1439bcebc2.796f-yopeer-0g9zeq1439bcebc2-1326224258/小程序插画设计-1/shop-share-page.jpg",
      path: '/packages/shop-package/pages/shop/shop?isShared=' + "true"
    }
 },
})