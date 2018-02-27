<template>
<div id="planner">

  <div id="unassigned-wrapper">
    <h2>Available Starships</h2>
    <draggable id='available-ships' v-model="ships" :options="{group:'ships'}">
      <Ship v-for="ship of ships" :key="ship.registry" :spec="ship"></Ship>
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

export default {
  name: 'planner',
  components: {
    Ship,
    Sector,
    draggable
  },
  data () {
    return {
      ships: [
        {registry: 2602, name: 'Reason', shipClass: 'Renaissance', prefix: 'USS', scale: 'cruiser', stats: [5, 3, 4, 5, 4, 5]},
        {registry: 2603, name: 'Epiphany', shipClass: 'Renaissance', prefix: 'USS', scale: 'cruiser', stats: [5, 3, 4, 5, 4, 5]},
        {registry: 2604, name: 'Enlightenment', shipClass: 'Renaissance', prefix: 'USS', scale: 'cruiser', stats: [5, 3, 4, 5, 4, 5]},
        {registry: 2605, name: 'Insight', shipClass: 'Renaissance', prefix: 'USS', scale: 'cruiser', stats: [5, 3, 4, 5, 4, 5]},
        {registry: 2617, name: 'Torch', shipClass: 'Renaissance', prefix: 'USS', scale: 'cruiser', stats: [5, 3, 4, 5, 4, 5]}
      ],
      sectors: [
        {name: 'Sol', def: 18, ships: []},
        {name: 'Vulcan', def: 10, ships: []},
        {name: 'Andor', def: 7, ships: []},
        {name: 'Tellar', def: 7, ships: []},
        {name: 'Amarkia', def: 7, ships: []},
        {name: 'Ferasa', def: 7, ships: []}
      ]
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
