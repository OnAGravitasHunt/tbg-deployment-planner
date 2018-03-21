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
    timeline: allData.timeline,
    currentTick: 0,
    showAddShip: false,
    showEditShip: false,
    showShipInfo: false,
    editTargetParent: '',
    newShip: {
      registry: '',
      name: '',
      shipClass: '',
      prefix: 'USS',
      scale: '',
      classStats: [0, 0, 0, 0, 0, 0],
      veterancy: 0,
      bonusStats: [0, 0, 0, 0, 0, 0],
      mobile: true
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
    ships: state => state.timeline[state.currentTick].ships,
    sectors: state => state.timeline[state.currentTick].sectors,
    dateLabel: state => state.timeline[state.currentTick].dateLabel
  },
  mutations: {
    // Save/Load
    restoreSave (state, save) { // restore save from localstorage
      state.timeline = save.timeline
      state.currentTick = save.currentTick
    },
    //
    // Deployment
    updateAvail (state, value) { // update list of unassigned ships
      state.timeline[state.currentTick].ships = value
    },
    updateSector (state, {sectorIndex, shipList}) { // update list of ships in sector
      state.timeline[state.currentTick].sectors[sectorIndex].ships = shipList
    },
    updateAvailAppend (state, value) { // update list of unassigned ships
      state.timeline[state.currentTick].ships.push(value)
    },
    //
    // List filtering
    updateFilter (state, {category, criterion, value}) { // update filter criterion
      state.filterCategories[category][criterion] = value
    },
    updateFilterAll (state, {category, value}) { // update all filter criteria in a category
      // console.log(state.filterCategories[category])
      Object.keys(state.filterCategories[category]).forEach(v => { state.filterCategories[category][v] = value })
    },
    //
    // List sorting
    sortSector (state, sectorIndex) {
      this.state.timeline[state.currentTick].sectors[0].ships.sort(function (a, b) {
        if (a.scale === 'station') {
          return -1
        } else if (b.scale === 'station') {
          return 1
        } else {
          return 0
        }
      })
    },
    //
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
          bonusStats: [0, 0, 0, 0, 0, 0],
          mobile: true
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
      Object.assign(state.newShip, shipObj)
    },
    createNewShip (state) {
      state.timeline[state.currentTick].ships.push(Object.assign({}, state.newShip))
    },
    commitShipChanges (state) {
      let targetArr, target
      if (state.editTargetParent === 'available-ships') {
        targetArr = state.timeline[state.currentTick].ships
      } else {
        targetArr = state.timeline[state.currentTick].sectors[Number(this.editTargetParent.split('-').pop())].ships
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
    },
    //
    // Timeline
    setDateLabel (state, date) {
      state.timeline[state.currentTick].dateLabel = date
    },
    changeTick (state, delta) {
      let newTick = state.currentTick + delta
      if (newTick < 0) {
        newTick = 0
      } else if (newTick >= state.timeline.length) {
        let last = JSON.parse(JSON.stringify(state.timeline[state.timeline.length - 1]))
        let i = state.currentTick + 1
        while (newTick >= state.timeline.length) {
          last.dateLabel = `Tick ${i}`
          state.timeline.push(last)
        }
        newTick = state.currentTick + delta
      } else {
        newTick = state.currentTick + delta
      }
      state.currentTick = newTick
    },
    //
    // Other mutations
    updateShowShipInfo (state, value) { // show/hide ship info modal
      state.showShipInfo = value
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
