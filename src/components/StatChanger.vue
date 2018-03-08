<template>
  <div class='stat-changer'>
    <table class='stat-table'>
      <tr class='stat-name-row'>
        <th></th>
        <th v-for="statName of statOrder" :key="'stat-name-' + statName">
          {{statName}}
        </th>
      </tr>

      <tr class='up-row'>
        <th>Base stats</th>
        <td v-for="(stat, index) of baseStats" :key="'base-' + statOrder[index]">
          {{stat}}
        </td>
      </tr>

      <tr class='up-row'>
        <th>Veterancy stats</th>
        <td v-for="(stat, index) of vetStats" :key="'vet-' + statOrder[index]">
          {{stat * veterancy}}
        </td>
      </tr>

      <tr class='up-row'>
        <th></th>
        <td v-for="(statName, index) of statOrder" :key="'up-' + statName" @click="() => { bStatChange(index, 1) }">
          &#9650;
        </td>
      </tr>

      <tr class='stat-row'>
        <th>Bonus stats</th>
        <td v-for="(stat, index) of bonusStats" :key="'bonus-' + statOrder[index]">
          <!-- <input v-model="stats[index]" class='align stat-value' placeholder='0'> -->
          {{stat}}
        </td>
      </tr>

      <tr class='down-row'>
        <th></th>
        <td v-for="(statName, index) of statOrder" :key="'down-' + statName" @click="() => { bStatChange(index, -1) }">
          &#9660;
        </td>
      </tr>

      <tr class='down-row'>
        <th>Total stats</th>
        <td v-for="(stat, index) of this.stats" :key="'stat-' + statOrder[index]">
          {{stat}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StatChanger',
  props: ['classStats', 'veterancy'],
  data () {
    return {
      baseStats: this.classStats,
      bonusStats: [0, 0, 0, 0, 0, 0],
      vetStats: [1, 1, 1, 1, 1, 0],
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D']
    }
  },
  computed: {
    stats: {
      get () {
        return this.baseStats.map((stat, i) => stat + this.bonusStats[i] + this.veterancy * this.vetStats[i])
      },
      set () {
        let newStats = this.baseStats.map((stat, i) => stat + this.bonusStats[i] + this.veterancy * this.vetStats[i])
        this.$store.commit('updateNewShipStats', newStats)
      }
    }
  },
  methods: {
    bStatChange (i, diff) {
      this.bonusStats.splice(i, 1, this.bonusStats[i] + diff)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stat-changer {
  margin-top: 10px;
  width: 20px;
  padding: 0px auto;
  display: block;
}

.stat-value {
  width: 15px;
  margin: 0px;
  padding: 0px;
  text-align: center;
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

th:first-child {
  min-width: 150px;
}
</style>
