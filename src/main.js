import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import VueRouter from 'vue-router'
import vuetify from './plugins/vuetify'
Vue.use(VueRouter)
Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.filter('truncate', function (value, size) {
  if (!value) return '';
  value = value.toString();

  if (value.length <= size) {
    return value;
  }
  return value.substr(0, size) + '...';
});


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
