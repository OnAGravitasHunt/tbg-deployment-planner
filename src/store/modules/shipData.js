import shipDataFields from '../../assets/shipDataFields.json'

function setShipField (ship, field, value) {
  switch (field) {
    case 'c':
      ship.classStats.splice(0, 1, Number(value))
      break
    case 's':
      ship.classStats.splice(1, 1, Number(value))
      break
    case 'h':
      ship.classStats.splice(2, 1, Number(value))
      break
    case 'l':
      ship.classStats.splice(3, 1, Number(value))
      break
    case 'p':
      ship.classStats.splice(4, 1, Number(value))
      break
    case 'd':
      ship.classStats.splice(5, 1, Number(value))
      break
    case 'name':
      ship.shipClass = value
      break
    default:
      ship[field] = value
  }
  return ship
}

const state = {
  prefixes: shipDataFields.prefixes,
  shipClasses: shipDataFields.shipClasses,
  operators: shipDataFields.operators,
  currentSchema: 'shipClasses',
  schemaList: {
    shipClasses: [
      {name: 'Class Name', key: 'name', type: 'text', display: 'wide'},
      {name: 'Scale', key: 'scale', type: 'select', options: ['frigate', 'cruiser', 'explorer', 'station']},
      {name: 'C', key: 'c', type: 'text', display: 'narrow'},
      {name: 'S', key: 's', type: 'text', display: 'narrow'},
      {name: 'H', key: 'h', type: 'text', display: 'narrow'},
      {name: 'L', key: 'l', type: 'text', display: 'narrow'},
      {name: 'P', key: 'p', type: 'text', display: 'narrow'},
      {name: 'D', key: 'd', type: 'text', display: 'narrow'},
      {name: '', key: 'delete', type: 'text', display: 'narrow'}
    ],
    prefixes: [
      {name: 'Prefix', key: 'prefix', type: 'text', display: 'wide'},
      {name: '', key: 'delete', type: 'text', display: 'narrow'}
    ]
  }
}

const actions = {
  updateShipClassFieldAction ({state, commit, rootState, rootGetters}, payload) {
    let className = state.shipClasses[payload.operator][payload.entryIndex].name
    let shipsOfClass = Object.values(rootGetters.shipObjects).filter(ship => ship.shipClass === className)
    commit('updateShipClassField', payload)
    commit('restoreFilter', state.shipClasses)
    for (let ship of shipsOfClass) {
      ship = setShipField(ship, payload.field, payload.value)
      commit('updateShipObject', {registry: ship.registry, newShip: ship})
    }
  },
  updatePrefixAction ({state, commit, rootState, rootGetters}, payload) {
    let prefix = state.prefixes[payload.entryIndex]
    let shipsOfPrefix = Object.values(rootGetters.shipObjects).filter(ship => ship.prefix === prefix)
    commit('updatePrefix', payload)
    for (let ship of shipsOfPrefix) {
      ship = setShipField(ship, 'prefix', payload.value)
      commit('updateShipObject', {registry: ship.registry, newShip: ship})
    }
  },
  deleteRowAction ({state, commit, rootState, rootGetters}, {operator, rowIndex}) {
    let property = {shipClasses: 'shipClass', prefixes: 'prefix'}[state.currentSchema]
    let comparison
    if (state.currentSchema === 'shipClasses') {
      comparison = state[state.currentSchema][operator][rowIndex].name
    } else {
      comparison = state[state.currentSchema][rowIndex]
    }
    let shipsOfProperty = Object.values(rootGetters.shipObjects)
      .map(ship => ship[property])
      .filter(shipProp => shipProp === comparison)
    if (!shipsOfProperty.length) {
      commit('deleteRow', {operator: operator, rowIndex: rowIndex})
    } else {
      // alert('Cannot delete; there are ships using this property.')
    }
  }
}

const mutations = {
  addShipClass (state, {operator, shipClass}) {
    state.shipClasses[operator].push(shipClass)
  },
  addShipPrefix (state, prefix) {
    state.prefixes.push(prefix)
  },
  restoreData (state, data) {
    state.prefixes = data.prefixes
    state.shipClasses = data.shipClasses
  },
  updateShipClassField (state, {operator, entryIndex, field, value}) {
    if (typeof state.shipClasses[operator][entryIndex][field] === 'number') {
      state.shipClasses[operator][entryIndex][field] = Number(value)
    } else {
      state.shipClasses[operator][entryIndex][field] = value
    }
  },
  updatePrefix (state, {entryIndex, field, value}) {
    state.prefixes.splice(entryIndex, 1, value)
  },
  setSchema (state, value) {
    state.currentSchema = value
  },
  deleteRow (state, {operator, rowIndex}) {
    if (state.currentSchema === 'shipClasses') {
      state[state.currentSchema][operator].splice(rowIndex, 1)
    } else {
      state[state.currentSchema].splice(rowIndex, 1)
    }
  }
}

export default {
  state,
  actions,
  mutations
}
