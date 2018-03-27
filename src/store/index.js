import Vue from 'vue'
import Vuex from 'vuex'
import deployment from './modules/deployment'
import filtering from './modules/filtering'
import sectorEditing from './modules/sectorEditing'
import shipEditing from './modules/shipEditing'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    deployment,
    filtering,
    sectorEditing,
    shipEditing
  },
  state: {
    showAddShip: false,
    showEditShip: false,
    showShipInfo: false,
    showAddSector: false,
    showEditSector: false
  },
  mutations: {
    // Add/edit sectors - modals
    updateShowAddSector (state, value) { // show/hide ship info modal
      state.showAddSector = value
    },
    updateShowEditSector (state, value) { // show/hide ship info modal
      state.showEditSector = value
    },
    // Add/edit ships - modals
    updateShowAddShip (state, value) { // show/hide ship info modal
      state.showAddShip = value
    },
    updateShowEditShip (state, value) { // show/hide ship info modal
      state.showEditShip = value
    },
    // Other modals
    updateShowShipInfo (state, value) { // show/hide ship info modal
      state.showShipInfo = value
    }
  }
})
