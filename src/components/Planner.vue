<template>
<div id="planner">
  <Unassigned></Unassigned>

  <div id="sectors-wrapper" :class="{'wide': !fullShips}">
    <SectorFilter></SectorFilter>
    <div id="theatre-list-wrapper">
      <Theatre v-for="theatre of theatres" :key="theatre" :theatreName="theatre"></Theatre>
    </div>
  </div>

</div>
</template>

<script>
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
    fullShips () {
      return this.$store.state.fullShipSize
    },
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
  padding-left: 250px;
  /* width: 100%; */
  background-color: black;
  color: #ccc;
}
#sectors-wrapper.wide {
  padding-left: 360px;
}
#theatre-list-wrapper {
  padding-top: 30px;
}
</style>
