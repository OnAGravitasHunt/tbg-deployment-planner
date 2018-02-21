// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  data: {
    ships: [
      { registry: '2105', name: 'Lightning', prefix: 'USS', shipClass: 'Centaur-A' },
      { registry: '2617', name: 'Torch', prefix: 'USS', shipClass: 'Renaissance' },
      { registry: '2010', name: 'Avandar', prefix: 'USS', shipClass: 'Excelsior' }
    ]
  },
  template: '<App/>'
})
