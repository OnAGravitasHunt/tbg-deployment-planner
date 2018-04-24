<template>
<div
  v-show="showTheatre"
  class="theatre"
>
  <div class='theatre-heading'>{{theatreName}} Theatre</div>
  <Sector v-if="theatreName !== 'None/Other'" :name="theatreName"></Sector>
  <Sector v-for="sector of sectors" :name="sector" :key="sector.name"></Sector>
</div>
</template>

<script>
import Sector from './Sector'
import draggable from 'vuedraggable'

export default {
  name: 'Theatre',
  components: {
    Sector,
    draggable
  },
  props: ['theatreName'],
  computed: {
    sectors () {
      return this.$store.getters.theatres[this.theatreName]
    },
    showTheatre () {
      return this.$store.state.sectorFiltering.filterCategories.theatre[this.theatreName.toLowerCase()]
    }
  }
}
</script>

<style>
.theatre-heading {
  padding: 5px 0 5px 20px;
  margin-left: 250px;
  border-bottom: 1px solid black;
  text-align: left;
  font-size: 25px;
  font-weight: bold;
  background-color: #8c8;
  color: black;
}
</style>
