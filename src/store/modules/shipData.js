import shipDataFields from '../../assets/shipDataFields.json'

function setShipField (ship, field, value) {
  // /*
  switch (field) {
    case 'c':
      ship.classStats[0] = Number(value)
      break
    case 's':
      ship.classStats[1] = Number(value)
      break
    case 'h':
      ship.classStats[2] = Number(value)
      break
    case 'l':
      ship.classStats[3] = Number(value)
      break
    case 'p':
      ship.classStats[4] = Number(value)
      break
    case 'd':
      ship.classStats[5] = Number(value)
      break
    default:
      ship[field] = value
  }
  return ship
  // */
}

const state = {
  prefixes: shipDataFields.prefixes,
  shipClasses: shipDataFields.shipClasses
}

const actions = {
  updateShipClassFieldAction ({state, commit, rootState, rootGetters}, payload) {
    let className = state.shipClasses[payload.classIndex].name
    let shipsOfClass = Object.values(rootGetters.shipObjects)
      .filter(ship => ship.shipClass === className)
    commit('updateShipClassField', payload)

    for (let ship of shipsOfClass) {
      ship = setShipField(ship, payload.field, payload.value)
      commit('updateShipObject', {registry: ship.registry, newShip: ship})
    }
  }
}

const mutations = {
  addShipClass (state, shipClass) {
    state.shipClasses.push(shipClass)
  },
  addShipPrefix (state, prefix) {
    state.prefixes.push(prefix)
  },
  restoreData (state, data) {
    state.prefixes = data.prefixes
    state.shipClasses = data.shipClasses
  },
  updateShipClassField (state, {classIndex, field, value}) {
    if (typeof state.shipClasses[classIndex][field] === 'number') {
      state.shipClasses[classIndex][field] = Number(value)
    } else {
      state.shipClasses[classIndex][field] = value
    }
  }
}

export default {
  state,
  actions,
  mutations
}
