const { shared, timing } = wx.worklet

const GestureState = {
  POSSIBLE: 0, // 0 此时手势未识别，如 panDown等
  BEGIN: 1, // 1 手势已识别
  ACTIVE: 2, // 2 连续手势活跃状态
  END: 3, // 3 手势终止
  CANCELLED: 4, // 4 手势取消，
}
Component({
  options:{
    multipleSlots:"true"
  },
  properties: {
    slideTime: { 
      type: Number,
      value: 300
    }, // 半屏划出时间 单位ms
    screenHeight:{
      type: Number,
      value: 70
    }


  },
  data: {
    list: '',
  },
  lifetimes: {
    created() {
      this.transY = shared(1000)
      this.scrollTop = shared(0)
      this.startPan = shared(true)
      this.itemHeight = shared(1000)
      this.ifMaskOn = shared(false)
    },
    ready() {
      const query = this.createSelectorQuery()
      // ready 生命周期里才能获取到首屏的布局信息
      query.select('.item-container').boundingClientRect()
      query.exec((res) => {
        this.transY.value = this.itemHeight.value = res[0].height
      })
      // 通过 transY 一个 SharedValue 控制半屏的位置
      this.applyAnimatedStyle('.item-container', () => {
        'worklet'
        return { transform: `translateY(${this.transY.value}px)` }
      })
    },
  },
  methods: {
    
    onTapOpenitem() {
      this.openitem(this.properties.slideTime)
    },
    openitem(duration) {
      'worklet'
      this.transY.value = timing(0, { duration })
      this.ifMaskOn.value = true
    },
    onTapCloseitem() {
      this.closeitem()
    },
    closeitem() {
      'worklet'
      this.transY.value = timing(this.itemHeight.value, { duration: 200 })
      this.ifMaskOn.value = false
    },
    // shouldPanResponse 和 shouldScrollViewResponse 用于 pan 手势和 scroll-view 滚动手势的协商
    shouldPanResponse() {
      'worklet'
      return this.startPan.value
    },
    shouldScrollViewResponse(pointerEvent) {
      'worklet'
      // transY > 0 说明 pan 手势在移动半屏，此时滚动不应生效
      if (this.transY.value > 0) return false
      const scrollTop = this.scrollTop.value
      const { deltaY } = pointerEvent
      // deltaY > 0 是往上滚动，scrollTop <= 0 是滚动到顶部边界，此时 pan 开始生效，滚动不生效
      const result = scrollTop <= 0 && deltaY > 0
      this.startPan.value = result
      return !result
    },
    handlePan(gestureEvent) {
      'worklet'
      if (gestureEvent.state === GestureState.ACTIVE) {
        const curPosition = this.transY.value
        const destination = Math.max(0, curPosition + gestureEvent.deltaY)
        if (curPosition === destination) return
        this.transY.value = destination
      }

      if (gestureEvent.state === GestureState.END || gestureEvent.state === GestureState.CANCELLED) {
        if (gestureEvent.velocityY > 500 && this.transY.value > 50) {
          this.ifMaskOn.value = false
          this.closeitem()
        } else if (this.transY.value > this.itemHeight.value / 2) {
          this.ifMaskOn.value = false
          this.closeitem()
        } else {
          this.ifMaskOn.value = true
          this.openitem(100)
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
  },
})