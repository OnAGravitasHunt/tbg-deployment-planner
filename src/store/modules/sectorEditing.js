const state = {
  selectedSectorIndex: '',
  selectedSector: {
    name: '',
    defense: '',
    type: '',
    theatre: '',
    supporters: []
  }
}

const getters = {
  selectedSector: state => state.selectedSector
}

const actions = {
  // commit changes to sector
  commitSectorChanges ({state, commit, rootState}) {
    commit('updateSectorAllFields', {sectorIndex: state.selectedSectorIndex, sector: Object.assign({}, state.selectedSector)})
  },
  // delete sector
  removeSector ({state, commit, rootState}) {
    commit('deleteSector', state.selectedSectorIndex)
  }
}

const mutations = {
  // set index of selected sector
  setSelectedSectorIndex (state, value) {
    state.selectedSectorIndex = value
  },
  // update single field of selected sector
  updateSelectedSectorField (state, {field, value}) {
    state.selectedSector[field] = value
  },
  // update all field of selected sector
  updateSelectedSectorAllFields (state, sectorObj) {
    Object.assign(state.selectedSector, sectorObj)
  },
  // add new sector
  addNewSector (state) {
    let newSector = Object.assign({}, state.selectedSector)
    newSector.ships = []
    state.timeline[state.currentTick].sectors.push(newSector)
  },
  clearSelectedSector (state) {
    state.selectedSector = {
      name: '',
      defense: '',
      type: '',
      theatre: '',
      supporters: []
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
