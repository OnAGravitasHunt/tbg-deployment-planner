<template>
<transition name='modal'>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class='modal-container'>
        <!--  -->
        <div class='modal-header'>
          <div class='lcars-bar lcars-bar-left'></div>
          <div class='lcars-bar lcars-bar-name'>{{currentShip.prefix}} {{currentShip.name}}</div>
          <div class='lcars-bar lcars-bar-reg'>NCC-{{currentShip.registry}}</div>
          <div class='lcars-bar lcars-bar-right'></div>
        </div>
        <!--  -->
        <div class='modal-body'>
          <div class='ship-data'>
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
          <div class='ship-data'>
            <p class='ship-data-item' v-html="displayClassName"></p>
            <p class='ship-data-item'>Launched: [LAUNCH DATE]</p>
            <p class='ship-data-item'>Captain: [CAPTAIN]</p>
            <p class='ship-data-item'>Assignment: [SECTOR]</p>
            <p class='ship-data-item'>Status: Active/Under Refit etc.</p>
          </div>
        </div>
        <!--  -->
        <div class='modal-footer'>
          <button class='modal-default-button' @click="showShipInfoModal = false">Close</button>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</transition>
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
    showShipInfoModal: {
      get () {
        return this.$store.state.showShipInfo
      },
      set (value) {
        this.$store.commit('updateShowShipInfo', value)
      }
    },
    currentShip () {
      return this.$store.state.shipEditing.newShip
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
}

li {
  margin: 10px 0px;
}

.lcars-bar {
  height: 40px;
  background-color:  #55f;
  margin: 0px;
  display: inline-block;
  vertical-align: top;
  font-size: 20px;
  color: #ccc;
  line-height: 40px;
  text-transform: uppercase;
}

.lcars-bar-left {
  width: 30px;
  border-radius: 20px 0px 0px 20px;
}

.lcars-bar-name {
  width: 270px;
  border-radius: 0;
  padding: 0px 10px;
}

.lcars-bar-reg {
  width: 110px;
  border-radius: 0;
  padding: 0px 10px;
}

.lcars-bar-right {
  width: 30px;
  border-radius: 0px 20px 20px 0px;
}

.modal-body {
  margin: 20px 0;
  display: flex;
  flex-flow: row wrap;
}

.ship-data {
  width: 228px;
  padding: 0px 10px;
  display: inline-block;
}

.ship-data:first-child {
  border-right: 1px solid white;
}

.image-placeholder {
  box-sizing: border-box;
  width: 228px;
  height: 100px;
  background-color: #ddd;
  color: black;
  padding: 10px;
}

button {
  background-color: #55f;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 50px;
  padding: 0px;
  color: #ccc;
  display: inline-block;
  margin: 5px 10px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
