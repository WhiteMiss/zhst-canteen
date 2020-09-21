import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/dataShare'
import fastClick from 'fastclick'
import './assets/styles/reset.css'
import './assets/styles/iconfont/iconfont.css'
// import './assets/styles/iconfont/MaterialIcons-Regular.css'
import './muse-ui'
import './element-ui'
// import './mock'

// import 'material-design-icons/iconfont/material-icons.css';

import custom from './custom'
Vue.use(custom);

Vue.config.devtools = true

fastClick.attach(document.body);

// 询问框、提示框、警告框插件
import { Alert, Confirm, Toast } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast)

import { GetReturnCode } from './unit/ReturnCode'
Vue.prototype.$getCode = GetReturnCode;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
