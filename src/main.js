import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import YmapPlugin from 'vue-yandex-maps'

const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1'
}



Vue.use(YmapPlugin, settings)


new Vue({
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
