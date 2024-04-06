
function clamp(val, min, max) {
  'worklet'
  return Math.min(Math.max(val, min), max)
}
const { shared, timing } = wx.worklet

const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}
var vibrated = 0; //是否已经震动
const { screenHeight, statusBarHeight, safeArea, windowHeight} = wx.getSystemInfoSync()
const tabbarHeight = screenHeight - windowHeight - statusBarHeight

Component({
  options:{
    multipleSlots: true
  },
  properties:{
    ifHandler:{
      type:Boolean,
      value: false
    },
    topHeight:{
      type: Number,
      value: statusBarHeight
    },
    headerHeight:{
      type: Number,
      value: 0
    },
    topHeight:{
      type: Number,
      value: statusBarHeight
    },
    ifVibrate :{
      type: Boolean,
      vaule: false
    }
  },
  data: {
    scale: 16,
    list: '',
  },
  lifetimes: {
    created() {
      this.transY = shared(1000)
      this.scrollTop = shared(0)
      this.startPan = shared(true)
      this.initTransY = shared(0) // 半屏的初始位置
      this.upward = shared(false)
    },
    attached() {
      this.setData({
        height: screenHeight - statusBarHeight,
      })
    },
    ready() {
      const query = this.createSelectorQuery()
      // ready 生命周期里才能获取到首屏的布局信息
      query.select('.item-header').boundingClientRect()
      query.exec((res) => {
        this.initTransY.value = screenHeight - res[0].height - (screenHeight - safeArea.bottom )- tabbarHeight
        this.transY.value = this.data.topHeight
        scrollTo(this.data.topHeight)
      })
      // 通过 transY 一个 SharedValue 控制半屏的位置
      this.applyAnimatedStyle('.item-container', () => {
        'worklet'
        return { transform: `translateY(${this.transY.value}px)` }
      })
    },
  },
  methods: {
    scrollTo(toValue) {
      'worklet'
      this.transY.value = timing(toValue, { duration: 200 })
    },
    // shouldPanResponse 和 shouldScrollViewResponse 用于 pan 手势和 scroll-view 滚动手势的协商
    shouldPanResponse() {
      'worklet'
      return this.startPan.value
    },
    shouldScrollViewResponse(pointerEvent) {
      'worklet'
      // transY > 0 说明 pan 手势在移动半屏，此时滚动不应生效
      if (this.transY.value > statusBarHeight) return false

      const scrollTop = this.scrollTop.value
      const { deltaY } = pointerEvent
      // deltaY > 0 是往上滚动，scrollTop <= 0 是滚动到顶部边界，此时 pan 开始生效，滚动不生效
      const result = scrollTop <= 0 && deltaY > 0
      this.startPan.value = result
      return !result
    },
    // 处理拖动半屏的手势
    handlePan(gestureEvent) {
      'worklet'
      // 滚动半屏的位置
      if (gestureEvent.state === GestureState.ACTIVE) {
        // deltaY < 0，往上滑动
        this.upward.value = gestureEvent.deltaY < 0
        // 当前半屏位置
        const curPosition = this.transY.value
        // 只能在 [statusBarHeight, screenHeight] 之间移动
        const destination = clamp(curPosition + gestureEvent.deltaY, statusBarHeight, screenHeight)
        if (curPosition === destination) return
        // 改变 transY，来改变半屏的位置
        this.transY.value = destination
      }

      if (gestureEvent.state === GestureState.END || gestureEvent.state === GestureState.CANCELLED) {
        
        if (this.transY.value <= screenHeight / 4) {
          if (gestureEvent.velocityY > 800 && !this.upward.value){
            this.scrollTo(this.initTransY.value) 
          } else{
            this.scrollTo(this.data.topHeight) 
          }
        } else if (this.transY.value > screenHeight / 3 && this.transY.value <= this.initTransY.value) {
          if(!this.upward.value){
            this.scrollTo(this.initTransY.value) // 滑倒底
          } else{
            this.scrollTo(this.data.topHeight) //滑到最上边
            
          }
        } else {
          if (gestureEvent.velocityY > 800 && this.upward.value){
            this.scrollTo(this.data.topHeight) 
          } else{
            this.scrollTo(this.initTransY.value) 
          }
        }
        
      }
    },
    adjustDecelerationVelocity(velocity) {
      'worklet'
      const scrollTop = this.scrollTop.value
      return scrollTop <= 0 ? 0 : velocity
    },
    handleScroll(evt) {
      'worklet'
      this.scrollTop.value = evt.detail.scrollTop
    },
    returnToTop(){
      this.scrollTo(this.data.topHeight)
    }
    // 简单兼容 WebView
    /*
    handleTouchEnd() {
      if (this.renderer === 'skyline') {
        return
      }
      if (this.transY.value === statusBarHeight) {
        this.lastTransY = statusBarHeight
        this.scrollTo(screenHeight / 2)
      } else if (this.transY.value === screenHeight / 2 && this.lastTransY === statusBarHeight) {
        this.lastTransY = screenHeight / 2
        this.scrollTo(this.initTransY.value)
      } else if (this.transY.value === this.initTransY.value) {
        this.lastTransY = this.initTransY.value
        this.scrollTo(screenHeight / 2)
      } else if (this.transY.value === screenHeight / 2 && this.lastTransY === this.initTransY.value) {
        this.scrollTo(statusBarHeight)
      }
    },*/
  },
})
