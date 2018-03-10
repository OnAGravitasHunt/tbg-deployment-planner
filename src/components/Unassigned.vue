<template>
<div id="unassigned-wrapper">
  <h2>Available Starships</h2>
  <draggable id='available-ships' v-model="availableShips" :options="{group:'ships'}">
    <Ship v-for="ship of availableShips" :key="ship.registry" v-bind="ship"></Ship>
  </draggable>
</div>
</template>

<script>
import Ship from './Ship'
import draggable from 'vuedraggable'
// import allData from '../assets/allData.json'

export default {
  name: 'Unassigned',
  components: {
    Ship,
    draggable
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
</style>
