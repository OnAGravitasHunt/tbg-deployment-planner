// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import allData from './assets/allData.json'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ships: allData.ships,
    sectors: allData.sectors
  },
  getters: {
    ships: state => state.ships,
    sectors: state => state.sectors
  },
  mutations: {
    updateAvail (state, value) {
      state.ships = value
    },
    updateSector (state, payload) {
      state.sectors[payload.sectorIndex].ships = payload.shipList
    },
    restoreSave (state, save) {
      state.ships = save.ships
      state.sectors = save.sectors
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
})
