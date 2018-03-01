<template>
<div id="planner">

  <div id="unassigned-wrapper">
    <h2>Available Starships</h2>
    <draggable id='available-ships' v-model="ships" :options="{group:'ships'}">
      <Ship v-for="ship of ships" :key="ship.registry" v-bind="ship"></Ship>
    </draggable>
  </div>

  <div id="sectors-wrapper">
    <Sector v-for="sector of sectors" v-bind="sector" :key="sector.name" :id="sector.name"></Sector>
  </div>

</div>
</template>

<script>
import Ship from './Ship'
import Sector from './Sector'
import draggable from 'vuedraggable'
import allData from '../assets/allData.json'

export default {
  name: 'planner',
  components: {
    Ship,
    Sector,
    draggable
  },
  data () {
    return {
      ships: allData.ships,
      sectors: allData.sectors
    }
  }
}
</script>

<style>
body {
  margin: 0;
}
#planner {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
#unassigned-wrapper {
  width: 250px;
  border-right: 2px solid black;
  height: 100%;
  position: fixed;
  float: left;
  background-color: #ccc;
  margin: 0px;
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
}
</style>
