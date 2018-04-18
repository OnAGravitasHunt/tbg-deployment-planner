const state = {
  editShipTargetParent: '',
  newShip: {
    registry: '',
    name: '',
    shipClass: '',
    prefix: 'USS',
    scale: '',
    classStats: [0, 0, 0, 0, 0, 0],
    veterancy: 0,
    bonusStats: [0, 0, 0, 0, 0, 0],
    mobile: true,
    captain: ''
  }
}

const actions = {
  // add new ship to list
  createNewShip ({state, commit, rootState}) {
    commit('updateShipObject', {registry: state.newShip.registry, newShip: state.newShip})
    commit('updateAvailAppend', state.newShip.registry)
    commit('clearNewShip')
    commit('setModal', 'none')
  },
  // commit changes to ship under edit
  commitShipChanges ({state, commit, rootState, rootGetters}) {
    commit('updateShipObject', {registry: state.newShip.registry, newShip: state.newShip})
  }
}

const mutations = {
  // update field of newShip
  updateNewShipField (state, {field, value}) {
    state.newShip[field] = value
  },
  // update all fields of newShip
  updateNewShipAllFields (state, shipObj) {
    shipObj.bonusStats = shipObj.bonusStats.slice()
    Object.assign(state.newShip, shipObj)
  },
  // set index of parent of ship under edit
  setEditShipTargetParent (state, t) {
    state.editShipTargetParent = t
  },
  clearNewShip (state) {
    state.newShip = {
      registry: '',
      name: '',
      shipClass: '',
      prefix: 'USS',
      scale: '',
      classStats: [0, 0, 0, 0, 0, 0],
      veterancy: 0,
      bonusStats: [0, 0, 0, 0, 0, 0],
      mobile: true,
      captain: ''
    }
  }
}

export default {
  state,
  actions,
  mutations
}
