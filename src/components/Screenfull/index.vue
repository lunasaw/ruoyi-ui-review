<template>
  <div>
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" @click="click" />
  </div>
</template>

<script>
// 全屏幕组件
import screenFull from 'screenfull'
import { isNotEmpty } from '@/utils/strtools'

export default {
  name: 'Screenfull',
  props: {
    fullElement: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 默认false 不全屏
      isFullscreen: false
    }
  },
  mounted () {
    this.init ()
  },
  beforeDestroy () {
    this.destroy ()
  },
  methods: {
    click () {
      if (!screenFull.isEnabled) {
        this.$message ({ message: '你的浏览器不支持全屏', type: 'warning' })
        return false
      }
      if (isNotEmpty (this.fullElement)) {
        let elementById = document.getElementById (this.fullElement)
        screenFull.toggle (elementById)
        return true
      }
      screenFull.toggle ()
      // https://github.com/sindresorhus/screenfull
      // scornful.toggle(event.target);
      // screenFull.toggle(elementById)
      // let elementById = document.getElementById(this.fullElement)
      // screenFull.request(elementById); // 指定元素全屏
      // screenFull.request(element, {navigationUI: 'hide'}); // 隐藏移动设备上的导航用户界面

    },
    change () {
      this.isFullscreen = screenFull.isFullscreen
    },
    init () {
      if (screenFull.isEnabled) {
        screenFull.on ('change', this.change)
      }
    },
    destroy () {
      if (screenFull.isEnabled) {
        screenFull.off ('change', this.change)
      }
    }
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
