<template>
<div id="planner">

  <Unassigned></Unassigned>

  <div id="sectors-wrapper">
    <Sector v-for="(sector, index) of sectors" v-bind="sector" :index="index" :key="sector.name" :id="sector.name"></Sector>
  </div>

</div>
</template>

<script>
import Ship from './Ship'
import Unassigned from './Unassigned'
import Sector from './Sector'
import draggable from 'vuedraggable'
// import allData from '../assets/allData.json'

export default {
  name: 'Planner',
  components: {
    Ship,
    Unassigned,
    Sector,
    draggable
  },
  data () {
    return {
      sectors: this.$store.state.deployment.sectors
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
#sectors-wrapper {
  width: 100%;
  float: right;
  background-color: black;
  color: #ccc;
  margin-top: 50px;
}
</style>
