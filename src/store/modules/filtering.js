import shipDataFields from '../../assets/shipDataFields.json'

function regenerateFilterArray (shipClasses) {
  return [].concat.apply([], Object.values(shipClasses))
    .reduce((classes, ship) => ({...classes, [ship.name]: true}), {})
}

const state = {
  filterCategories: {
    shipClass: regenerateFilterArray(shipDataFields.shipClasses),
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
    state.filterCategories.shipClass = regenerateFilterArray(shipClasses)
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
