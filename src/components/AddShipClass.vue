<template>
  <div class='add-ship-class'>
    <ul class='add-ship-class-fields'>
      <li>
        <span>Class name:</span>
        <input v-model="shipClassName" placeholder='Class Name'>
      </li>
      <li>
        <span>Class scale:</span>
        <select v-model="shipClassScale">
          <option disabled value="">Select class scale</option>
          <option v-for="shipScale of shipScales" :key="shipScale">{{shipScale}}</option>
        </select>
      </li>
      <li>
        <table class='stat-table'>
          <tr class='stat-name-row'>
            <th></th>
            <th v-for="statName of statOrder" :key="'stat-name-' + statName">
              {{statName}}
            </th>
          </tr>

          <tr class='up-row'>
            <th></th>
            <td v-for="(statName, index) of statOrder"
              :key="'up-' + statName"
              @click="statChange(index, 1)"
            >&#9650;</td>
          </tr>

          <tr class='stat-row'>
            <th>Class stats</th>
            <td v-for="(stat, index) of shipClassStats" :key="'stat-' + statOrder[index]">
              <input
                v-model="shipClassStats[index]"
                class='stat-value'
                placeholder='0'
                @input="checkPositive(index, $event)"
              >
              <!-- {{stat}} -->
            </td>
          </tr>

          <tr class='down-row'>
            <th></th>
            <td v-for="(statName, index) of statOrder"
              :key="'down-' + statName"
              @click="statChange(index, -1)"
            >&#9660;</td>
          </tr>
        </table>
      </li>
      <li>
        <div
          :class="`button button-error-${newClassError}`"
          @click="saveClass"
        >{{classMessage}}</div>
      </li>
      <hr/>
      <li>
        <span>Prefix:</span>
        <input v-model="newPrefix" placeholder='Class Name'>
      </li>
      <li>
        <div
          :class="`button button-error-${newPrefixError}`"
          @click="savePrefix"
        >{{prefixMessage}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import StatChanger from './StatChanger'

export default {
  name: 'AddShipClass',
  components: {
    StatChanger
  },
  data () {
    return {
      shipScales: ['frigate', 'cruiser', 'explorer', 'station'],
      shipClassName: '',
      shipClassScale: '',
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D'],
      shipClassStats: [0, 0, 0, 0, 0, 0],
      newPrefix: '',
      classMessage: 'Save Class',
      prefixMessage: 'Save Prefix',
      newClassError: false,
      newPrefixError: false
    }
  },
  methods: {
    statChange (i, diff) {
      this.shipClassStats.splice(i, 1, Math.max(Number(this.shipClassStats[i]) + diff, 0))
    },
    checkPositive (index, event) {
      let value = event.target.value
      if (value < 0 || isNaN(value)) {
        this.shipClassStats[index] = 0
      }
    },
    saveClass () {
      if (this.shipClassName && this.shipClassScale) {
        if (this.$store.state.shipData.shipClasses.filter(shipClass => shipClass.name === this.shipClassName).length) {
          this.classMessage = 'Class Exists'
          this.newClassError = true
          setTimeout(() => {
            this.classMessage = 'Save Class'
            this.newClassError = false
          }, 1200)
        } else {
          this.$store.commit('addShipClass', {
            name: this.shipClassName,
            scale: this.shipClassScale,
            stats: this.shipClassStats
          })
          this.classMessage = 'Class Added'
          this.$store.commit('restoreFilter', this.$store.state.shipData.shipClasses)
          setTimeout(() => {
            this.classMessage = 'Save Class'
          }, 1200)
        }
      }
    },
    savePrefix () {
      if (this.newPrefix) {
        if (this.$store.state.shipData.prefixes.filter(prefix => prefix === this.newPrefix).length) {
          this.prefixMessage = 'Prefix Exists'
          this.newPrefixError = true
          setTimeout(() => {
            this.prefixMessage = 'Save Prefix'
            this.newPrefixError = false
          }, 1500)
        } else {
          this.$store.commit('addShipPrefix', this.newPrefix)
          this.prefixMessage = 'Prefix Added'
          setTimeout(() => {
            this.prefixMessage = 'Save Prefix'
          }, 1500)
        }
      }
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-ship-class {
  margin: 20px 0;
  display: inline-block;
  vertical-align: top;
}
.add-ship-class-fields {
  list-style-type:none;
  padding-left: 10px;
}
li {
  margin: 10px 0px;
}
select, input {
  float: right;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
}
th, td {
  min-width: 30px;
  text-align: center;
}
.stat-name-row th {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.up-row td,
.up-row th {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.stat-row td,
.stat-row th {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.down-row td,
.down-row th {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.up-row td,
.down-row td {
  -moz-user-select: none;
  -webkit-user-select: none;
}
.stat-value {
  width: 20px;
  text-align: center;
  margin: auto 4px;
  border: none;
}
.button {
  border-radius: 20px;
  /* width: 100px; */
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #4a3;
  padding: 0 10px;
  margin: 0 2px;
}
.button-error-true {
  background-color: #a43;
}
</style>
