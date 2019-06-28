// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import 'material-icons/iconfont/material-icons.css';
import Vuesax from 'vuesax'

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax)



Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8080',
  tokenName: 'access_token',
  storageType: 'cookieStorage',
  providers: {
    google: {
      clientId: '1098951548205-115s5tchrb9i6fuqhetgd383gmr4o58h.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/search' // Your client app URL
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
