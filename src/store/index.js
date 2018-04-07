import Vue from 'vue'
import Vuex from 'vuex'
import deployment from './modules/deployment'
import filtering from './modules/filtering'
import sectorEditing from './modules/sectorEditing'
import sectorFiltering from './modules/sectorFiltering'
import shipData from './modules/shipData'
import shipEditing from './modules/shipEditing'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    deployment,
    filtering,
    sectorEditing,
    sectorFiltering,
    shipData,
    shipEditing
  },
  actions: {
    restoreSave (context, save) {
      context.commit('restoreTimeline', save.timeline)
      context.commit('restoreData', save.data)
      context.commit('restoreFilter', save.data.shipClasses)
    }
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
    setModal (state, value) {
      state.currentModal = value
    },
    setAllModalsHidden (state) {
      state.currentModal = 'none'
    },
    // Add modals
    updateShowAddSector (state, value) { // show/hide ship info modal
      state.currentModal = 'add-sector'
    },
    updateShowAddShip (state, value) { // show/hide ship info modal
      state.currentModal = 'add-ship'
    },
    // Ship Modals
    updateShowEditShip (state, value) { // show/hide ship info modal
      state.currentModal = 'ship-edit'
    },
    updateShowShipInfo (state, value) { // show/hide ship info modal
      state.currentModal = 'ship-info'
    },
    // Sector Modals
    updateShowEditSector (state, value) { // show/hide ship info modal
      state.currentModal = 'sector-edit'
    }
  }
})
