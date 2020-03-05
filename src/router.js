import Vue from 'vue'
import Router from 'vue-router'
import { getRouterList } from 'assets/js/menu'

Vue.use(Router)

export default new Router({
  routes: getRouterList()
})
