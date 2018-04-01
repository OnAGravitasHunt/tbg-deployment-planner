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
    modalBools: {
      // showModalBase: false,
      showAddShip: false,
      showEditShip: false,
      showShipInfo: false,
      showAddSector: false,
      showEditSector: false
    }
  },
  mutations: {
    // Add/edit sectors - modals
    /* updateShowModalBase (state, value) { // show/hide ship info modal
      state.modalBools.showModalBase = value
    }, */
    updateShowAddSector (state, value) { // show/hide ship info modal
      state.modalBools.showAddSector = value
    },
    updateShowEditSector (state, value) { // show/hide ship info modal
      state.modalBools.showEditSector = value
    },
    // Add/edit ships - modals
    updateShowAddShip (state, value) { // show/hide ship info modal
      state.modalBools.showAddShip = value
    },
    updateShowEditShip (state, value) { // show/hide ship info modal
      state.modalBools.showEditShip = value
    },
    // Other modals
    updateShowShipInfo (state, value) { // show/hide ship info modal
      state.modalBools.showShipInfo = value
    }
  }
})
