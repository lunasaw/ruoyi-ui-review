import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import permission from './modules/permission'
import settings from './modules/settings'
import getters from './getters'

Vue.use (Vuex)

const store = new Vuex.Store ({
  modules: {
    app,
    // 用户信息
    user,
    // 标签
    tagsView,
    // 权限
    permission,
    // 网页设置信息
    settings
  },
  getters
})

export default store
