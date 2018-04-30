<template>
  <div id="app">
    <ModalBase v-show="currentModal !== 'none'"></ModalBase>
    <SaveLoad></SaveLoad>
    <Planner></Planner>
  </div>
</template>

<script>
import Planner from './components/Planner'
import SaveLoad from './components/SaveLoad'
import ModalBase from './components/modalCommon/ModalBase'
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
    currentModal () {
      return this.$store.state.currentModal
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
/* scrollbar */
#app::-webkit-scrollbar {
    width: 8px;
}
#app::-webkit-scrollbar-track {
  width: 10px;
  padding-left: 1px;
  border-radius: 4px;
}
#app::-webkit-scrollbar-thumb {
  background: #888;
  /* border-radius: 5px; */
}
#app::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>
