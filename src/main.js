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
      stats: ''
    }
  },
  getters: {
    ships: state => state.deployment.ships,
    sectors: state => state.deployment.sectors
  },
  mutations: {
    updateAvail (state, value) { // update list of unassigned ships
      state.deployment.ships = value
    },
    updateSector (state, payload) { // update list of ships in sector
      state.deployment.sectors[payload.sectorIndex].ships = payload.shipList
    },
    restoreSave (state, save) { // restore save from localstorage
      state.deployment.ships = save.ships
      state.deployment.sectors = save.sectors
    },
    updateShowAddShip (state, value) { // update addShip modal visibility
      if (value === true) { // blank out any existing ship
        state.newShip = {
          registry: '',
          name: '',
          shipClass: '',
          prefix: 'USS',
          scale: '',
          stats: ''
        }
      }
      state.showAddShip = value
    },
    updateNewShipField (state, {field, value}) { // update field of newShip
      state.newShip[field] = value
    },
    createNewShip (state) {
      state.deployment.ships.push(Object.assign({}, state.newShip))
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
