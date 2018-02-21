<template>
<div id="app">

  <div id="unassigned">
    <h2>Available Starships</h2>
    <draggable v-model="ships">
      <Ship name="Torch" prefix="USS" shipClass="Renaissance" registry="2617" :stats="[5,3,4,5,4,5]"></Ship>
      <Ship name="Avandar" prefix="USS" shipClass="Excelsior" registry="2010" :stats="[8,7,5,7,7,6]"></Ship>
      <Ship name="Lightning" prefix="USS" shipClass="Centaur" registry="2105" :stats="[4,5,3,4,4,3]"></Ship>
    </draggable>
  </div>

</div>
</template>

<script>
import Ship from './components/Ship'
import draggable from 'vuedraggable'

export default {
  name: 'App',
  components: {
    Ship,
    draggable
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 100%
}
#unassigned {
  width: 20%;
  border-right: 2px solid black;
  height: 100%;
  position: absolute;
  float: left;
  background-color: #ccc;
  margin: 0px;
}
</style>
