<template>
<div id="planner">

  <div id="unassigned-wrapper">
    <h2>Available Starships</h2>
    <draggable id='available-ships' v-model="ships" :options="{group:'ships'}">
      <Ship v-for="ship of ships" :key="ship.registry" :spec="ship"></Ship>
    </draggable>
  </div>

  <div id="sectors-wrapper">
    <div class='sector' v-for="sector of sectors" :key="sector.name" :id="sector.name">
      <h3>{{sector.name}} &ndash; D{{sector.def}}</h3>
      <draggable class='sector-drag' v-model="sector.ships" :options="{group:'ships'}">
        <Ship v-for="ship of sector.ships" :key="ship.registry" :spec="ship"></Ship>
      </draggable>
    </div>
  </div>

</div>
</template>

<script>
import Ship from './Ship'
import draggable from 'vuedraggable'

export default {
  name: 'planner',
  components: {
    Ship,
    draggable
  },
  data () {
    return {
      ships: [
        {registry: 2617, name: 'Torch', shipClass: 'Renaissance', prefix: 'USS', stats: [5, 3, 4, 5, 4, 5]},
        {registry: 2010, name: 'Avandar', shipClass: 'Excelsior', prefix: 'USS', stats: [8, 7, 5, 7, 7, 6]},
        {registry: 2105, name: 'Lightning', shipClass: 'Centaur', prefix: 'USS', stats: [4, 5, 3, 4, 4, 3]}
      ],
      sectors: [
        {name: 'Sol', def: 18, ships: []},
        {name: 'Vulcan', def: 10, ships: []},
        {name: 'Andor', def: 7, ships: []},
        {name: 'Tellar', def: 7, ships: []}
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
  width: 100%
}
#unassigned-wrapper {
  width: 250px;
  border-right: 2px solid black;
  height: 100%;
  position: absolute;
  float: left;
  background-color: #ccc;
  margin: 0px;
}
#available-ships {
  min-height: 200px;
  padding-bottom: 100px;
}
#sectors-wrapper {
  width: 100%;
  float: right;
}
.sector {
  min-height: 100px;
  text-align: left;
  padding-left: 30px;
  margin-left: 250px;
}
.sector-drag {
  min-height: inherit;
}
</style>
