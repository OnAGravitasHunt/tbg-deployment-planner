const state = {
  filterCategories: {
    theatre: {
      tailward: true,
      central: true,
      spinward: true,
      other: true
    },
    type: {
      core: true,
      border: true,
      taskforce: true,
      theatrefleet: true
    }
  }
}

const mutations = {
  // update sector filter criterion
  updateSectorFilter (state, {category, criterion, value}) {
    state.filterCategories[category][criterion] = value
  },
  // update all sector filter criteria in a category
  updateSectorFilterAll (state, {category, value}) {
    Object.keys(state.filterCategories[category]).forEach(v => { state.filterCategories[category][v] = value })
  }
}

export default {
  state,
  mutations
}
