// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import { CouponCell, CouponList, Popup, NumberKeyboard } from 'vant'
import 'vant/lib/vant-css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(VueAxios, axios)
Vue.use(ToastPlugin).use(LoadingPlugin)

FastClick.attach(document.body)
Vue.use(CouponCell).use(CouponList).use(Popup).use(NumberKeyboard)

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (!sessionStorage.phone) {
      next('login')
      return
    }
  }
  next()
})
/* eslint-disable no-new */
new Vue({
  // router,
  router,
  render: h => h(App)
}).$mount('#app-box')
