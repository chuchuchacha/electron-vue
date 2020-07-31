import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { dom } from '@fortawesome/fontawesome-svg-core'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

dom.watch();

Vue.config.productionTip = false

library.add(faCoffee, faGooglePlus);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App),
  // created() {
  //   // Prevent blank screen in Electron builds
  //   this.$router.push('/')
  // }
}).$mount('#app')
