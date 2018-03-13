// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import allData from './assets/allData.json'
import shipDataFields from './assets/shipDataFields.json'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    deployment: {
      ships: allData.ships,
      sectors: allData.sectors
    },
    showAddShip: false,
    showEditShip: false,
    editTargetParent: '',
    newShip: {
      registry: '',
      name: '',
      shipClass: '',
      prefix: 'USS',
      scale: '',
      classStats: [0, 0, 0, 0, 0, 0],
      veterancy: 0,
      bonusStats: [0, 0, 0, 0, 0, 0]
    },
    filterCategories: {
      shipClass: shipDataFields.shipClasses.reduce((classes, ship) => ({...classes, [ship.name]: true}), {}),
      scale: {
        frigate: true,
        cruiser: true,
        explorer: true
      },
      minDef: 0
    }
  },
  getters: {
    ships: state => state.deployment.ships,
    sectors: state => state.deployment.sectors
  },
  mutations: {
    // Save/Load
    restoreSave (state, save) { // restore save from localstorage
      state.deployment.ships = save.ships
      state.deployment.sectors = save.sectors
    },
    // Deployment
    updateAvail (state, value) { // update list of unassigned ships
      state.deployment.ships = value
    },
    updateSector (state, payload) { // update list of ships in sector
      state.deployment.sectors[payload.sectorIndex].ships = payload.shipList
    },
    // List filtering
    updateFilter (state, {category, criterion, value}) { // update filter criterion
      state.filterCategories[category][criterion] = value
    },
    updateFilterAll (state, {category, value}) { // update all filter criteria in a category
      // console.log(state.filterCategories[category])
      Object.keys(state.filterCategories[category]).forEach(v => { state.filterCategories[category][v] = value })
    },
    // Ship editing/creation
    updateShowAddShip (state, value) { // update addShip modal visibility
      if (value === true) { // blank out any existing ship if opening
        state.newShip = {
          registry: '',
          name: '',
          shipClass: '',
          prefix: 'USS',
          scale: '',
          classStats: [0, 0, 0, 0, 0, 0],
          veterancy: 0,
          bonusStats: [0, 0, 0, 0, 0, 0]
        }
      }
      state.showAddShip = value
    },
    updateShowEditShip (state, value) { // update addShip modal visibility
      state.showEditShip = value
    },
    updateNewShipField (state, {field, value}) { // update field of newShip
      state.newShip[field] = value
    },
    updateNewShipAllFields (state, shipObj) {
      // console.log('updating')
      Object.assign(state.newShip, shipObj)
    },
    createNewShip (state) {
      state.deployment.ships.push(Object.assign({}, state.newShip))
    },
    commitShipChanges (state) {
      let targetArr, target
      if (state.editTargetParent === 'available-ships') {
        targetArr = state.deployment.ships
      } else {
        targetArr = state.deployment.sectors[Number(this.editTargetParent.split('-').pop())].ships
      }
      target = targetArr.map((el) => el.registry).indexOf(state.newShip.registry)
      Object.assign(targetArr[target], state.newShip)
      state.showEditShip = false
      state.newShip = {
        registry: '',
        name: '',
        shipClass: '',
        prefix: 'USS',
        scale: '',
        classStats: [0, 0, 0, 0, 0, 0],
        veterancy: 0,
        bonusStats: [0, 0, 0, 0, 0, 0]
      }
    },
    setEditTargetParent (state, t) {
      state.editTargetParent = t
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
