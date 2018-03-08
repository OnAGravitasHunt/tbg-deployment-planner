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
    deployment: {
      ships: allData.ships,
      sectors: allData.sectors
    },
    showAddShip: false,
    newShip: {
      registry: '',
      name: '',
      shipClass: '',
      prefix: 'USS',
      scale: '',
      stats: [0, 0, 0, 0, 0, 0]
    }
  },
  getters: {
    ships: state => state.deployment.ships,
    sectors: state => state.deployment.sectors
  },
  mutations: {
    updateAvail (state, value) {
      state.deployment.ships = value
    },
    updateSector (state, payload) {
      state.deployment.sectors[payload.sectorIndex].ships = payload.shipList
    },
    restoreSave (state, save) {
      state.deployment.ships = save.ships
      state.deployment.sectors = save.sectors
    },
    updateShowAddShip (state, value) {
      if (value === true) {
        state.newShip.shipClass = 'Ambassador'
      }
      state.showAddShip = value
    },
    updateNewShipName (state, shipName) {
      state.newShip = ship
    },
    updateNewShipStats (state, shipStats) {
      state.newShip.stats = shipStats
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
