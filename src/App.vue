<template>
  <div id="app">
    <!-- <AddShip v-if="showAddShipModal"></AddShip> -->
    <!-- <EditShip v-if="showEditShipModal"></EditShip> -->
    <!-- <ShipInfo v-if="showShipInfoModal"></ShipInfo> -->
    <!-- <AddSector v-if="showAddSectorModal"></AddSector> -->
    <!-- <EditSector v-if="showEditSectorModal"></EditSector> -->
    <ModalBase v-show="showModalBase"></ModalBase>
    <SaveLoad></SaveLoad>
    <Planner></Planner>
  </div>
</template>

<script>
import Planner from './components/Planner'
import SaveLoad from './components/SaveLoad'
import ModalBase from './components/ModalBase'
import AddShip from './components/AddShip'
import EditShip from './components/EditShip'
import ShipInfo from './components/ShipInfo'
import AddSector from './components/AddSector'
import EditSector from './components/EditSector'

export default {
  name: 'app',
  components: {
    Planner,
    SaveLoad,
    ModalBase,
    AddShip,
    EditShip,
    ShipInfo,
    AddSector,
    EditSector
  },
  computed: {
    showModalBase: {
      get () {
        // let vals = Object.values(this.$store.state.modalBools)
        return Object.values(this.$store.state.modalBools).reduce((acc, curr) => acc || curr, false)
        // return this.$store.state.modalBools.showModalBase
      },
      set (value) {
        this.$store.commit('updateShowModalBase', value)
      }
    },
    showAddShipModal: {
      get () {
        return this.$store.state.modalBools.showAddShip
      },
      set (value) {
        this.$store.commit('updateShowAddShip', value)
      }
    },
    showEditShipModal: {
      get () {
        return this.$store.state.modalBools.showEditShip
      },
      set (value) {
        this.$store.commit('updateShowEditShip', value)
      }
    },
    showShipInfoModal: {
      get () {
        return this.$store.state.modalBools.showShipInfo
      },
      set (value) {
        this.$store.commit('updateShowShipInfo', value)
      }
    },
    showAddSectorModal: {
      get () {
        return this.$store.state.modalBools.showAddSector
      },
      set (value) {
        this.$store.commit('updateShowAddSector', value)
      }
    },
    showEditSectorModal: {
      get () {
        return this.$store.state.modalBools.showEditSector
      },
      set (value) {
        this.$store.commit('updateShowEditSector', value)
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
  background-color: black;
}
button:focus {
  outline:0;
}
</style>
