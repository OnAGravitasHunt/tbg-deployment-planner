<template>
  <div class='bb-sector'>
    [SPOILER={{sectorName}}]
    [SIZE=8]{{sectorName}}[/SIZE]
    <ul>
      <li class='sector-tick' v-for="tick of sector.ships" :key="tick.dateLabel">
        {{tick.dateLabel}}: <!--
        --><template v-for="(ship, index) of tick.ships.map(shipReg => shipObjects[shipReg])">
          <BBShip
            :key="ship.registry"
            :ship="ship"
          ></BBShip><span :key="index" v-if="index < tick.ships.length - 1">;&#160;</span>
        </template>
      </li>
    </ul>
    [/SPOILER]
  </div>
</template>

<script>
import BBShip from './BBShip'

export default {
  name: 'BBSector',
  components: {
    BBShip
  },
  props: ['sectorName', 'sector', 'shipObjects'],
  methods: {},
  computed: {
    sectorShips () {
      return this.sector.ships.map(shipName => this.shipObjects[shipName])
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
