<template>
  <div class='bb-theatre'>
    [SPOILER={{theatreName}} Theatre]
    [SIZE=12]{{theatreName}} Theatre[/SIZE]
    <BBSector
      v-for="sectorName of sectorNames"
      :sectorName="sectorName"
      :sector="sectors[sectorName]"
      :shipObjects="shipObjects"
      :key="`${theatreName}-${sectorName}`"
    ></BBSector>
    [/SPOILER]
  </div>
</template>

<script>
import BBSector from './BBSector'

export default {
  name: 'BBTheatre',
  components: {
    BBSector
  },
  props: ['theatreName', 'timeline'],
  methods: {},
  computed: {
    sectorNames () {
      return this.timeline.theatres[this.theatreName]
    },
    sectors () {
      return this.timeline.sectors
    },
    shipObjects () {
      return this.timeline.shipObjects
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  text-align: center;
  vertical-align: top;
  height: 40px;
  width: 100px;
  background-color: #06a;
  line-height: 40px;
  border: none;
  outline: none;
  padding: 0px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
</style>
