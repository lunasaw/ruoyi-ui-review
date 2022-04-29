<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'
import log from '@/views/monitor/job/log'

export default {
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  created () {
    console.log (this.to)
  },
  computed: {
    isExternal () {
      return isExternal (this.to)
    },
    type () {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    }
  },
  methods: {
    linkProps (to) {
      if (this.isExternal) {
        return {
          href: to,
          target: '_blank',
          rel: 'noopener'
        }
      }
      return {
        to: to
      }
    }
  }
}
</script>
