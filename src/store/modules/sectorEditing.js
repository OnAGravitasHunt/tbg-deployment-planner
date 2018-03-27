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
  // commit changes to sector
  commitSectorChanges (state) {
    Object.assign(state.timeline[state.currentTick].sectors[state.selectedSectorIndex], state.selectedSector)
  },
  // add new sector
  addNewSector (state) {
    let newSector = Object.assign({}, state.selectedSector)
    newSector.ships = []
    state.timeline[state.currentTick].sectors.push(newSector)
  },
  // delete sector
  deleteSector (state) {
    // remove sector
    let deleted = state.timeline[state.currentTick].sectors.splice(state.selectedSectorIndex, 1)[0]
    // add removed ship to unassigned
    state.timeline[state.currentTick].ships = state.timeline[state.currentTick].ships.concat(deleted.ships)
  }
}

export default {
  state,
  // actions,
  mutations
}
