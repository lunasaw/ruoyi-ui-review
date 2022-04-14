<template>
  <div>
    <svg-icon icon-class="question" class-name="svg-icon" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'LunarDoc',
  data() {
    return {
      url: 'https://github.com/lunasaw/ruoyi-ui-review/blob/master/README.md'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
