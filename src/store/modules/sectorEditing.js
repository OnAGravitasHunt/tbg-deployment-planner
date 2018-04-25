const state = {
  selectedSectorName: '',
  selectedSector: {
    name: '',
    defence: '',
    type: '',
    theatre: '',
    supporters: []
  },
  statusMessage: ''
}

const getters = {
  selectedSector: state => state.selectedSector
}

const actions = {
  // add new sector
  createNewSector ({state, commit, rootState}) {
    let newSector = Object.assign({}, state.selectedSector)
    newSector.ships = []
    commit('addNewSector', newSector)
  },
  // commit changes to sector
  commitSectorChanges ({state, commit, rootState}) {
    commit('updateSectorAllFields', {
      sectorName: state.selectedSectorName,
      sector: Object.assign({}, state.selectedSector)
    })
  },
  abortSectorChanges ({state, commit, rootState}) {
    commit('abortSectorChanges')
  },
  // delete sector
  removeSector ({state, commit, rootState}) {
    commit('deleteSector', state.selectedSectorName)
  }
}

const mutations = {
  abortSectorChanges (state) {
    console.log('aborting')
    state.statusMessage = 'Error: There is already a sector with that name.'
    setTimeout(() => { state.statusMessage = '' }, 1000)
  },
  setStatusMessage (state, value) {
    state.statusMessage = value
  },
  // set index of selected sector
  setSelectedSectorName (state, value) {
    state.selectedSectorName = value
  },
  // update single field of selected sector
  updateSelectedSectorField (state, {field, value}) {
    state.selectedSector[field] = value
  },
  // update all field of selected sector
  updateSelectedSectorAllFields (state, sectorObj) {
    Object.assign(state.selectedSector, sectorObj)
  },
  clearSelectedSector (state) {
    state.selectedSector = {
      name: '',
      defence: '',
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
