import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//异步路由
const test = r => require.ensure([], () => r(require('../views/test')), 'test')
const luckywheel = r => require.ensure([], () => r(require('../views/luckywheel')), 'luckywheel')


export default new Router({
  routes: [
    {
      path: '/',
      component: luckywheel
    },
    {
      path: '/luckywheel',
      name: 'luckywheel',
      component: luckywheel
    } 
  ]
})
