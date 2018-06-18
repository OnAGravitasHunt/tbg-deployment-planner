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
    currentModal: 'none',
    fullShipSize: false
  },
  mutations: {
    setModal (state, value) {
      state.currentModal = value
    },
    setAllModalsHidden (state) {
      state.currentModal = 'none'
    },
    toggleShipSummary (state) {
      state.fullShipSize = !state.fullShipSize
    }
  }
})
