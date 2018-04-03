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
    mobile: true
  }
}

const actions = {
  // add new ship to list
  createNewShip ({state, commit, rootState}) {
    commit('updateAvailAppend', Object.assign({}, state.newShip), {root: 'true'})
  },
  // commit changes to ship under edit
  commitShipChanges ({state, commit, rootState, rootGetters}) {
    let targetArr, index
    if (state.editShipTargetParent === 'available-ships') {
      targetArr = rootGetters.ships
      index = targetArr.map((el) => el.registry).indexOf(state.newShip.registry)
      targetArr[index] = Object.assign(targetArr[index], state.newShip)
      commit('updateAvail', targetArr, {root: 'true'})
    } else {
      let sectorIndex = Number(state.editShipTargetParent.split('-').pop())
      targetArr = rootGetters.sectors[sectorIndex].ships
      index = targetArr.map((el) => el.registry).indexOf(state.newShip.registry)
      targetArr[index] = Object.assign(targetArr[index], state.newShip)
      commit('updateSectorField', {sectorIndex: sectorIndex, field: 'ships', value: targetArr}, {root: 'true'})
    }
    /*
    state.newShip = {
      registry: '',
      name: '',
      shipClass: '',
      prefix: 'USS',
      scale: '',
      classStats: [0, 0, 0, 0, 0, 0],
      veterancy: 0,
      bonusStats: [0, 0, 0, 0, 0, 0]
    }
    */
  }
}

const mutations = {
  // update field of newShip
  updateNewShipField (state, {field, value}) {
    // console.log(state.newShip)
    state.newShip[field] = value
  },
  // update all fields of newShip
  updateNewShipAllFields (state, shipObj) {
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
      bonusStats: [0, 0, 0, 0, 0, 0]
    }
  }
}

export default {
  state,
  actions,
  mutations
}
