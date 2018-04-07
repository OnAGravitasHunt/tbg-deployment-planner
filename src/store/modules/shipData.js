import shipDataFields from '../../assets/shipDataFields.json'

const state = {
  prefixes: shipDataFields.prefixes,
  shipClasses: shipDataFields.shipClasses
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
  }
}

export default {
  state,
  mutations
}
