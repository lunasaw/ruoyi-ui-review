<template>
  <!--  是否隐藏-->
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child" :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  created () {
    console.log ('以下是子菜单的数据：', this.item.path)
  },
  props: {
    // route object
    // 路由组件的路由对象
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 是否展示子菜单
    hasOneShowingChild (children = [], parent) {
      if (!children) {
        children = []
      }
      const showingChildren = children.filter (item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          // 临时设置设置(如果只有一个显示子对象则使用)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // 当只有一个子路由器时，缺省显示该子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 如果没有子路由器显示，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath (routePath, routeQuery) {
      // 是外部链接
      if (isExternal (routePath)) {
        return routePath
      }
      // 是父组件路径
      if (isExternal (this.basePath)) {
        return this.basePath
      }
      if (routeQuery) {
        let query = JSON.parse (routeQuery)
        return { path: path.resolve (this.basePath, routePath), query: query }
      }
      return path.resolve (this.basePath, routePath)
    }
  }
}
</script>
