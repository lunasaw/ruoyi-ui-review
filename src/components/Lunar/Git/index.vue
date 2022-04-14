<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'LunarGit',
  data() {
    return {
      url: 'https://github.com/lunasaw/ruoyi-ui-review/'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
