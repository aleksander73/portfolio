import Vue from 'vue'
import VueRouter from 'vue-router'
import vueRouter from './router'
import App from './App.vue'
import i18n from './i18n'

Vue.use(VueRouter)
Vue.config.productionTip = false

new Vue({
  i18n,
  render: h => h(App),
  router: new VueRouter({ routes: vueRouter.routes, mode: 'history' })
}).$mount('#app')
