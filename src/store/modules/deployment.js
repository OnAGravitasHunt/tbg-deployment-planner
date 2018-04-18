import allData from '../../assets/allData.json'

const state = {
  timeline: allData.timeline,
  currentTick: 0
}

const getters = {
  shipObjects: state => state.timeline[state.currentTick].shipObjects,
  unassignedShips: state => state.timeline[state.currentTick].unassignedShips,
  sectors: state => state.timeline[state.currentTick].sectors,
  dateLabel: state => state.timeline[state.currentTick].dateLabel
}

const mutations = {
  // Save/Load
  restoreTimeline (state, timeline) { // restore save from localstorage
    state.timeline = timeline.timeline
    state.currentTick = timeline.currentTick
  },
  // update list of unassigned ships
  updateAvail (state, value) {
    state.timeline[state.currentTick].unassignedShips = value
  },
  // update a particular sector
  updateSectorField (state, {sectorIndex, field, value}) {
    state.timeline[state.currentTick].sectors[sectorIndex][field] = value
  },
  updateSectorAllFields (state, {sectorIndex, sector}) {
    Object.assign(state.timeline[state.currentTick].sectors[sectorIndex], sector)
  },
  // mutation to add sector
  addNewSector (state, sector) {
    state.timeline[state.currentTick].sectors.push(sector)
  },
  // mutation to remove sector
  deleteSector (state, index) {
    let deletedShips = state.timeline[state.currentTick].sectors.splice(index, 1)[0].ships
    state.timeline[state.currentTick].unassignedShips = state.timeline[state.currentTick].ships.concat(deletedShips)
  },
  // update list of unassigned ships
  updateAvailAppend (state, value) {
    state.timeline[state.currentTick].unassignedShips.push(value)
  },
  //
  // Update ship objects
  // updateShipField (state, {registry, field, value}) {
  //   state.timeline[state.currentTick].shipObjects[registry][field] = value
  // },
  updateShipObject (state, {registry, newShip}) {
    console.log(`Updating NCC-${registry}`)
    state.timeline[state.currentTick].shipObjects[registry] = newShip
  },
  //
  // List sorting - places starbases first
  sortSector (state, sectorIndex) {
    state.timeline[state.currentTick].sectors[sectorIndex].ships.sort(function (a, b) {
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
      let i = 1
      while (newTick >= state.timeline.length) {
        // last.dateLabel = `Tick ${i}`
        let label = last.dateLabel.split('+')
        if (label.length < 2) {
          last.dateLabel = last.dateLabel + '+' + i
        } else {
          last.dateLabel = label[0] + '+' + (Number(label[1]) + i)
        }
        state.timeline.push(last)
        i++
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
      let label = current.dateLabel.split('+')
      if (label.length < 2) {
        current.dateLabel = current.dateLabel + '+1'
      } else {
        current.dateLabel = label[0] + '+' + (Number(label[1]) + 1)
      }
      state.timeline.push(current)
    } else {
      current.dateLabel = state.timeline[state.currentTick + 1].dateLabel
      state.timeline[state.currentTick + 1] = current
    }
    state.currentTick++
  },
  insertNewTick (state) {
    let current = JSON.parse(JSON.stringify(state.timeline[state.currentTick]))
    let label = current.dateLabel.split('+')
    if (label.length < 2) {
      current.dateLabel = current.dateLabel + '+1'
    } else {
      current.dateLabel = label[0] + '+' + (Number(label[1]) + 1)
    }
    if (state.currentTick === state.timeline.length - 1) {
      state.timeline.push(current)
    } else {
      state.timeline.splice(state.currentTick + 1, 0, current)
      state.timeline[state.currentTick + 1] = current
    }
    state.currentTick++
  },
  deleteTick (state) {
    if (state.timeline.length > 1) {
      if (state.currentTick === state.timeline.length - 1) {
        state.currentTick -= 1
        state.timeline.splice(state.currentTick + 1, 1)
      } else {
        state.timeline.splice(state.currentTick, 1)
      }
    }
  }
}

export default {
  state,
  getters,
  mutations
}
