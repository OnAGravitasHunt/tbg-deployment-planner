<template>
<div id="planner">

  <Unassigned></Unassigned>

  <div id="sectors-wrapper">
    <SectorFilter></SectorFilter>
    <div id="theatre-list-wrapper">
      <Theatre v-for="theatre of theatres" :key="theatre" :theatreName="theatre"></Theatre>
      <!-- <Sector v-for="(sector, index) of sectors" v-bind="sector" :index="index" :key="sector.name" :id="sector.name"></Sector> -->
    </div>
  </div>

</div>
</template>

<script>
// import Ship from './Ship'
import Unassigned from './Unassigned'
import SectorFilter from './SectorFilter'
import Sector from './Sector'
import Theatre from './Theatre'
import draggable from 'vuedraggable'

export default {
  name: 'Planner',
  components: {
    Unassigned,
    SectorFilter,
    Sector,
    Theatre,
    draggable
  },
  computed: {
    sectors () {
      return this.$store.getters.sectors
    },
    theatres () {
      return this.$store.getters.theatreList
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
  margin-top: 50px;
}
#sectors-wrapper {
  width: 100%;
  float: right;
  background-color: black;
  color: #ccc;
  /* margin-top: 50px; */
  /* padding-top: 30px; */
}
#theatre-list-wrapper {
  margin-top: 30px;
}
</style>
