<template>
<div id="planner">

  <div id="unassigned-wrapper">
    <h2>Available Starships</h2>
    <draggable id='available-ships' v-model="availableShips" :options="{group:'ships'}">
      <Ship v-for="ship of availableShips" :key="ship.registry" v-bind="ship"></Ship>
    </draggable>
  </div>

  <div id="sectors-wrapper">
    <Sector v-for="(sector, index) of sectors" v-bind="sector" :index="index" :key="sector.name" :id="sector.name"></Sector>
  </div>

</div>
</template>

<script>
import Ship from './Ship'
import Sector from './Sector'
import draggable from 'vuedraggable'
// import allData from '../assets/allData.json'

export default {
  name: 'planner',
  components: {
    Ship,
    Sector,
    draggable
  },
  data () {
    return {
      sectors: this.$store.state.deployment.sectors
    }
  },
  computed: {
    availableShips: {
      get () {
        return this.$store.state.deployment.ships
      },
      set (value) {
        this.$store.commit('updateAvail', value)
      }
    }
  }
}
</script>

<style>
#planner {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  /* margin-top: 30px; */
}
#unassigned-wrapper {
  width: 250px;
  border-right: 2px solid black;
  height: 100%;
  position: fixed;
  float: left;
  background-color: #ccc;
  margin-top: 50px;
  overflow-y: scroll;
}
#available-ships {
  min-height: 200px;
  padding-bottom: 100px;
}
#sectors-wrapper {
  width: 100%;
  float: right;
  background-color: black;
  color: #ccc;
  margin-top: 50px;
}
</style>
