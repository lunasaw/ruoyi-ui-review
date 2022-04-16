<template>
<!-- trigger	触发下拉的行为	string	hover/click/contextmenu 默认	hover -->
  <el-dropdown trigger="click" @command="handleSetSize" placement="bottom">
    <div>
      <!-- 字体图标 -->
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="item of sizeOptions" :key="item.value" :disabled="size === item.value" :command="item.value">
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
// 大小选择器
export default {
  data () {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },
  computed: {
    size () {
      return this.$store.getters.size
    }
  },
  methods: {
    handleSetSize (size) {
      // 点击触发事件，改变字体大小
      // 这一步很关键，这是 Element-UI 向 Vue 暴露的实例属性
      this.$ELEMENT.size = size
      this.$store.dispatch ('app/setSize', size)
      this.refreshView ()
      this.$message ({
        message: 'Switch Size Success',
        type: 'success'
      })
    },
    // 刷新视图
    refreshView () {
      // In order to make the cached page re-rendered
      // 以便重新渲染缓存的页面
      // 触发vuex事件更新清理缓存
      this.$store.dispatch ('tagsView/delAllCachedViews', this.$route)

      // 当前视图 this.$route /index
      const { fullPath } = this.$route
      console.log (fullPath)
      this.$nextTick (() => {
        this.$router.replace ({
          // 重定向到当前路由
          path: '/redirect' + fullPath
        })
      })
    }
  }

}
</script>
