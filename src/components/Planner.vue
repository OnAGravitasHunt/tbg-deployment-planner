<template>
<div id="planner">

  <Unassigned></Unassigned>

  <div id="sectors-wrapper">
    <SectorFilter></SectorFilter>
    <div id="sector-list-wrapper">
      <Sector v-for="(sector, index) of sectors" v-bind="sector" :index="index" :key="sector.name" :id="sector.name"></Sector>
    </div>
  </div>

</div>
</template>

<script>
// import Ship from './Ship'
import Unassigned from './Unassigned'
import SectorFilter from './SectorFilter'
import Sector from './Sector'
import draggable from 'vuedraggable'
// import allData from '../assets/allData.json'

export default {
  name: 'Planner',
  components: {
    Unassigned,
    SectorFilter,
    Sector,
    draggable
  },
  data () {
    return {}
  },
  computed: {
    sectors () {
      return this.$store.getters.sectors
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
#sector-list-wrapper {
  margin-top: 30px;
}
</style>
