<template>
  <!--  如果是外部图标 走div 内部图标走svg 自定义class-->
  <div v-if="isExternal" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners" />
  <!--  aria-hidden="true" 会把整个元素从可访问性API中移除-->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 是否外部图标
    isExternal () {
      return isExternal (this.iconClass)
    },
    // 图标名称
    iconName () {
      return `#icon-${this.iconClass}`
    },
    // avg class获取
    svgClass () {
      if (this.className) {
        console.log (this.className)
        // 这里有空格 注意：拼接类名
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    styleExternalIcon () {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
