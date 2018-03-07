<template>
  <div id="app">
    <AddShip v-if="showAddShipModal"></AddShip>
    <SaveLoad></SaveLoad>
    <Planner></Planner>
  </div>
</template>

<script>
import Planner from './components/Planner'
import SaveLoad from './components/SaveLoad'
import AddShip from './components/AddShip'

export default {
  name: 'app',
  components: {
    Planner,
    SaveLoad,
    AddShip
  },
  computed: {
    showAddShipModal: {
      get () {
        return this.$store.state.showAddShip
      },
      set (value) {
        this.$store.commit('updateShowAddShip', value)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
}
</style>
