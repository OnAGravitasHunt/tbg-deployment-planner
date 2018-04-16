import shipDataFields from '../../assets/shipDataFields.json'

const state = {
  prefixes: shipDataFields.prefixes,
  shipClasses: shipDataFields.shipClasses
}

const actions = {
  updateShipClassFieldAction ({state, commit, rootState}, payload) {
    commit('updateShipClassField', payload)
    let name = state.shipClass[payload.classIndex].name
    console.log(name)
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
