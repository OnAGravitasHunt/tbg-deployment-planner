<template>
  <table class='stat-table'>
    <tr
      v-if="colHeader"
      class='stat-name-row'
    >
      <th v-if="rowHeader"></th>
      <th v-for="statName of statOrder" :key="'stat-name-' + statName">
        {{statName}}
      </th>
    </tr>

    <tr class='up-row'>
      <th v-if="rowHeader"></th>
      <td v-for="(statName, index) of statOrder"
        :key="'up-' + statName"
        @click="statChange(index, 1)"
      >&#9650;</td>
    </tr>

    <tr class='stat-row'>
      <th v-if="rowHeader">Class stats</th>
      <td v-for="(stat, index) of initialStats" :key="'stat-' + statOrder[index]">
        <input
          v-model="shipClassStats[index]"
          class='stat-value'
          placeholder='0'
          @input="checkPositive(index, $event)"
        >
      </td>
    </tr>

    <tr class='down-row'>
      <th v-if="rowHeader"></th>
      <td v-for="(statName, index) of statOrder"
        :key="'down-' + statName"
        @click="statChange(index, -1)"
      >&#9660;</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'StatPicker',
  props: ['initialStats', 'rowHeader', 'colHeader'],
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D'],
      shipClassStats: [0, 0, 0, 0, 0, 0]
    }
  },
  computed: {},
  methods: {
    statChange (i, diff) {
      console.log(this.header)
      this.shipClassStats.splice(i, 1, Math.max(Number(this.shipClassStats[i]) + diff, 0))
    },
    checkPositive (index, event) {
      let value = event.target.value
      if (value < 0 || isNaN(value)) {
        this.shipClassStats[index] = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stat-changer {
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
  width: 150px;
  border-spacing: 0;
  border-collapse: collapse;
  table-layout: fixed;
}

th, td {
  min-width: 30px;
  text-align: center;
}

.stat-value {
  width: 20px;
  text-align: center;
  margin: auto 4px;
  border: none;
}

/*
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
} */
</style>
