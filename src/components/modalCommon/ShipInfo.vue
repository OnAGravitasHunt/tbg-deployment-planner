<template>
  <div class='ship-info'>
    <div class='ship-data-column'>
      <div class='image-placeholder'>[Image here]</div>
      <table class='stat-table'>
        <tr class='stat-name-row'>
          <th v-for="statName of statOrder" :key="'stat-name-' + statName">
            {{statName}}
          </th>
        </tr>

        <tr class='stat-row'>
          <td v-for="(stat, index) of shipStats" :key="'stat-' + statOrder[index]">
            {{stat}}
          </td>
        </tr>
      </table>
      <p class='ship-data-item'>{{veterancy}}</p>
    </div>
    <div class='ship-data-column'>
      <p class='ship-data-item' v-html="displayClassName"></p>
      <p class='ship-data-item'>Launched: [LAUNCH DATE]</p>
      <!-- <p class='ship-data-item'>Captain: [CAPTAIN]</p> -->
      <p class='ship-data-item'>Assignment: [SECTOR]</p>
      <p class='ship-data-item'>Status: Active/Under Refit etc.</p>
    </div>
  </div>
</template>

<script>
import shipDataFields from '../assets/shipDataFields.json'

export default {
  name: 'ShipInfo',
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D'],
      veterancies: shipDataFields.veterancies,
      vetStats: [1, 1, 1, 1, 1, 0]
    }
  },
  computed: {
    currentShip () {
      let ship = this.$store.getters.shipObjects[this.$store.state.shipEditing.shipRegistry]
      if (ship) {
        return ship
      } else {
        return {
          registry: '',
          name: '',
          shipClass: '',
          prefix: 'USS',
          scale: '',
          classStats: [0, 0, 0, 0, 0, 0],
          veterancy: 0,
          bonusStats: [0, 0, 0, 0, 0, 0],
          mobile: true,
          captain: ''
        }
      }
    },
    displayShipName () {
      if (this.currentShip.scale === 'station') {
        return this.currentShip.name
      } else {
        return `${this.currentShip.prefix} <em>${this.currentShip.name}</em>, NCC-${this.currentShip.registry}`
      }
    },
    displayClassName () {
      if (this.currentShip.scale === 'station') {
        return this.currentShip.shipClass
      } else {
        let splitName = this.currentShip.shipClass.split('-')
        let dispName = ''
        if (splitName.length === 1) {
          dispName = `<em>${splitName[0]}</em>`
        } else {
          dispName = `<em>${splitName[0]}</em>-${splitName[1]}`
        }
        return `${dispName}-class ${this.currentShip.scale}`
      }
    },
    shipStats () {
      return this.currentShip.classStats.map((stat, i) => stat + this.currentShip.bonusStats[i] + this.currentShip.veterancy * this.vetStats[i])
    },
    veterancy () {
      return this.currentShip.veterancy ? `(${this.veterancies[this.currentShip.veterancy]})` : ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ship-info {
  display: inline-block;
  vertical-align: top;
  margin-top: 30px;
}
li {
  margin: 10px 0px;
}
.ship-data-column {
  vertical-align: top;
  width: 228px;
  padding: 0px 10px;
  display: inline-block;
}
.ship-data-column:first-child {
  border-right: 1px solid white;
}
.image-placeholder {
  box-sizing: border-box;
  width: 228px;
  height: 100px;
  background-color: #ddd;
  color: black;
  text-align: center;
  line-height: 100px;
}
table {
  margin: 10px 0;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
}
th, td {
  min-width: 35px;
  text-align: center;
}
.stat-name-row th {
  border: 1px solid #ccc;
  border: 1px solid #ccc;
  border: 1px solid #ccc;
}
.stat-row td {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>
