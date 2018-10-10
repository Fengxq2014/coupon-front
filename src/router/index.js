import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import success from '@/components/Success'
import list from '@/components/list'
import verification from '@/components/verification'
import MchList from '@/components/MchList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/success',
      name: 'success',
      component: success
    }, {
      path: '/list',
      name: 'list',
      component: list
    }, {
      path: '/verify',
      name: 'verification',
      component: verification
    }, {
      path: '/mchlist',
      name: 'mchlist',
      component: MchList
    }
  ]
})
