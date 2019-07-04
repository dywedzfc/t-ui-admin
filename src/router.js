import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('./views/Home.vue')
        },
        {
          path: '/zdfx/zjgz',
          name: 'helloworld',
          component: HelloWorld
        },
        {
          path: '/pbgl/pbcx',
          name: 'helloworld',
          component: HelloWorld
        },
        {
          path: '/tjgl/cxtj',
          name: 'About',
          component: () => import('./views/About.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
