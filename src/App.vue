<template>
  <div id="app">
    <AddShip v-if="showAddShipModal"></AddShip>
    <EditShip v-if="showEditShipModal"></EditShip>
    <ShipInfo v-if="showShipInfoModal"></ShipInfo>
    <SaveLoad></SaveLoad>
    <Planner></Planner>
  </div>
</template>

<script>
import Planner from './components/Planner'
import SaveLoad from './components/SaveLoad'
import AddShip from './components/AddShip'
import EditShip from './components/EditShip'
import ShipInfo from './components/ShipInfo'

export default {
  name: 'app',
  components: {
    Planner,
    SaveLoad,
    AddShip,
    EditShip,
    ShipInfo
  },
  computed: {
    showAddShipModal: {
      get () {
        return this.$store.state.showAddShip
      },
      set (value) {
        this.$store.commit('updateShowAddShip', value)
      }
    },
    showEditShipModal: {
      get () {
        return this.$store.state.showEditShip
      },
      set (value) {
        this.$store.commit('updateShowEditShip', value)
      }
    },
    showShipInfoModal: {
      get () {
        return this.$store.state.showShipInfo
      },
      set (value) {
        this.$store.commit('updateShowShipInfo', value)
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}
html, body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style>
