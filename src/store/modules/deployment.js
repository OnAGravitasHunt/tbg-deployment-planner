import allData from '../../assets/allData.json'

const state = {
  timeline: allData.timeline,
  currentTick: 0
}

const getters = {
  ships: state => state.timeline[state.currentTick].ships,
  sectors: state => state.timeline[state.currentTick].sectors,
  dateLabel: state => state.timeline[state.currentTick].dateLabel
}

const mutations = {
  // Save/Load
  restoreSave (state, save) { // restore save from localstorage
    state.timeline = save.timeline
    state.currentTick = save.currentTick
  },
  // update list of unassigned ships
  updateAvail (state, value) {
    state.timeline[state.currentTick].ships = value
  },
  // update list of ships in sector
  updateSectorField (state, {sectorIndex, field, value}) {
    state.timeline[state.currentTick].sectors[sectorIndex][field] = value
  },
  updateSectorAllFields (state, {sectorIndex, sector}) {
    Object.assign(state.timeline[state.currentTick].sectors[sectorIndex], sector)
  },
  // mutation to remove sector
  deleteSector (state, index) {
    let deletedShips = state.timeline[state.currentTick].sectors.splice(index, 1)[0].ships
    state.timeline[state.currentTick].ships = state.timeline[state.currentTick].ships.concat(deletedShips)
  },
  // update list of unassigned ships
  updateAvailAppend (state, value) {
    state.timeline[state.currentTick].ships.push(value)
  },
  //
  // List sorting (only Sol for now)
  // Places starbases first
  sortSector (state, sectorIndex) {
    state.timeline[state.currentTick].sectors[0].ships.sort(function (a, b) {
      if (a.scale === 'station') {
        return -1
      } else if (b.scale === 'station') {
        return 1
      } else {
        return 0
      }
    })
  },
  // Set Tick name
  setDateLabel (state, date) {
    state.timeline[state.currentTick].dateLabel = date
  },
  // Move forwards or backwards
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
  // copy current state to next tick (overwrites if exists)
  copyForwards (state) {
    let current = JSON.parse(JSON.stringify(state.timeline[state.currentTick]))
    if (state.currentTick === state.timeline.length - 1) {
      current.dateLabel = `Tick ${state.currentTick + 1}`
      state.timeline.push(current)
    } else {
      current.dateLabel = state.timeline[state.currentTick + 1].dateLabel
      state.timeline[state.currentTick + 1] = current
    }
  }
}

export default {
  state,
  getters,
  mutations
}
