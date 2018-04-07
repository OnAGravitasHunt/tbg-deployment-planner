import shipDataFields from '../../assets/shipDataFields.json'

const state = {
  filterCategories: {
    shipClass: shipDataFields.shipClasses.reduce((classes, ship) => ({...classes, [ship.name]: true}), {}),
    scale: {
      frigate: true,
      cruiser: true,
      explorer: true,
      station: true
    },
    minDef: 0
  }
}

const mutations = {
  // update filter criterion
  restoreFilter (state, shipClasses) {
    state.filterCategories.shipClass = shipClasses.reduce((classes, ship) => ({...classes, [ship.name]: true}), {})
  },
  updateFilter (state, {category, criterion, value}) {
    state.filterCategories[category][criterion] = value
  },
  // update all filter criteria in a category
  updateFilterAll (state, {category, value}) {
    Object.keys(state.filterCategories[category]).forEach(v => { state.filterCategories[category][v] = value })
    state.filterCategories.scale.station = true
  }
}

export default {
  state,
  mutations
}
