<template>
  <div class='stat-changer'>
    <table class='stat-table'>
      <tr class='stat-name-row'>
        <th v-for="statName of statOrder" :key="statName">
          {{statName}}
        </th>
      </tr>

      <tr class='up-row'>
        <td v-for="statName of statOrder" :key="statName">
          &#9650;
        </td>
      </tr>

      <tr class='stat-row'>
        <td v-for="statName of statOrder" :key="statName">
          <input class='align stat-value' placeholder='0'>
        </td>
      </tr>

      <tr class='down-row'>
        <td v-for="statName of statOrder" :key="statName">
          &#9660;
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'StatChanger',
  data () {
    return {
      // statName: 'C',
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D']
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stat-changer {
  margin-top: 10px;
  width: 20px;
  padding: 0px auto;
  /* align-items: center; */
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
}

th, td {
  width: 40px;
  text-align: center;
}

.stat-name-row th {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.up-row td {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.stat-row td {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.down-row td {
  border-bottom: 1px solid #ccc;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>
