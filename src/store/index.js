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
    currentModal: 'none'
    /* modalBools: {
      showAddShip: false,
      showEditShip: false,
      showShipInfo: false,
      showAddSector: false,
      showEditSector: false
    } */
  },
  mutations: {
    setAllModalsHidden (state) {
      state.currentModal = 'none'
      /*
      for (let modalFlag of Object.keys(state.modalBools)) {
        state.modalBools[modalFlag] = false
      }
      */
    },
    // Add/edit sectors - modals
    updateShowAddSector (state, value) { // show/hide ship info modal
      // state.modalBools.showAddSector = value
      state.currentModal = 'showAddSector'
    },
    updateShowEditSector (state, value) { // show/hide ship info modal
      // state.modalBools.showEditSector = value
      state.currentModal = 'showEditSector'
    },
    // Add/edit ships - modals
    updateShowAddShip (state, value) { // show/hide ship info modal
      // state.modalBools.showAddShip = value
      state.currentModal = 'showAddShip'
    },
    updateShowEditShip (state, value) { // show/hide ship info modal
      // state.modalBools.showEditShip = value
      state.currentModal = 'showEditShip'
    },
    // Other modals
    updateShowShipInfo (state, value) { // show/hide ship info modal
      // state.modalBools.showShipInfo = value
      state.currentModal = 'showShipInfo'
    }
  }
})
