import allData from '../../assets/allData.json'

const SCALE_SORT = {
  explorer: 0,
  cruiser: 1,
  frigate: 2
}

const state = {
  timeline: allData.timeline,
  currentTick: 0
}

const getters = {
  shipObjects: state => state.timeline[state.currentTick].shipObjects,
  unassignedShips: state => state.timeline[state.currentTick].unassignedShips,
  theatreList: state => state.timeline[state.currentTick].theatreList,
  theatres: state => state.timeline[state.currentTick].theatres,
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
  sortAvail (state) {
    state.timeline[state.currentTick].unassignedShips.sort(
      (a, b) => SCALE_SORT[state.timeline[state.currentTick].shipObjects[a].scale]
        - SCALE_SORT[state.timeline[state.currentTick].shipObjects[b].scale]
    )
  },
  // update a particular sector
  updateSectorField (state, {sectorName, field, value}) {
    state.timeline[state.currentTick].sectors[sectorName][field] = value
  },
  updateSectorAllFields (state, {sectorName, sector}) {
    // sectorName: unchanged name of sector; sector: changed sector object
    let oldSector = state.timeline[state.currentTick].sectors[sectorName] // unchanged sector object
    let oldTheatre = state.timeline[state.currentTick].theatres[oldSector.theatre] // theatre array
    if (oldSector.theatre !== sector.theatre) { // if theatre has been changed
      // add sector key to new theatre
      state.timeline[state.currentTick].theatres[sector.theatre].push(sectorName)
      // remove sector key from old theatre
      state.timeline[state.currentTick].theatres[oldSector.theatre].splice(oldTheatre.indexOf(sectorName), 1)
    }
    if (oldSector.name !== sector.name) { // if name has been changed
      let oldName = oldSector.name
      sector = Object.assign(oldSector, sector)
      // move sector object to new key
      state.timeline[state.currentTick].sectors[sector.name] = sector
      // replace old key with new (theatre will have already updated if theatre has changed)
      let index = state.timeline[state.currentTick].theatres[sector.theatre].indexOf(oldName)
      state.timeline[state.currentTick].theatres[sector.theatre].splice(index, 1, sector.name)
      // remove old sector
      delete state.timeline[state.currentTick].sectors[oldName]
    }
  },
  // mutation to add sector
  addNewSector (state, sector) {
    state.timeline[state.currentTick].sectors.push(sector)
  },
  // mutation to remove sector
  deleteSector (state, sectorName) {
    let sector = state.timeline[state.currentTick].sectors[sectorName]
    let theatre = state.timeline[state.currentTick].theatres[sector.theatre]
    state.timeline[state.currentTick].unassignedShips = state.timeline[state.currentTick].unassignedShips.concat(sector.ships)
    state.timeline[state.currentTick].theatres[sector.theatre].splice(theatre.indexOf(sectorName), 1)
    delete state.timeline[state.currentTick].sectors[sectorName]
  },
  // update list of unassigned ships
  updateAvailAppend (state, value) {
    state.timeline[state.currentTick].unassignedShips.unshift(value)
  },
  //
  // Update ship objects
  updateShipObject (state, {registry, newShip}) {
    state.timeline[state.currentTick].shipObjects[registry] = newShip
  },
  updateAllShipObjects (state, newShips) {
    Object.assign(state.timeline[state.currentTick].shipObjects, newShips)
  },
  //
  // List sorting - places starbases first
  sortSector (state, sectorName) {
    state.timeline[state.currentTick].sectors[sectorName].ships.sort(function (a, b) {
      let shipA = state.timeline[state.currentTick].shipObjects[a]
      let shipB = state.timeline[state.currentTick].shipObjects[b]
      if (shipA.scale === 'station') {
        return -1
      } else if (shipB.scale === 'station') {
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
