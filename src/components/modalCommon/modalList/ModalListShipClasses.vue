<template>
  <div class='modal-list'>
    <table>
      <tr>
        <th v-for="field of schemaFields" :key="field.name">{{field.name}}</th>
      </tr>
      <template v-for="operator of operators">
        <tr :key="operator">
          <th class='operator-header' colspan='9'>{{operator}}</th>
        </tr>
        <ModalListRow
          v-for="(entry, index) of dataPoints[operator.toLowerCase()]"
          :key="entry.className"
          :entry="entry"
          currentSchema='shipClasses'
          :rowIndex="index"
          :operator="operator"
        ></ModalListRow>
      </template>
    </table>
  </div>
</template>

<script>
import ModalListRow from './ModalListRow'

export default {
  name: 'ModalList',
  components: {
    ModalListRow
  },
  methods: {},
  computed: {
    currentSchema () {
      return this.$store.state.shipData.currentSchema
    },
    schemaFields () {
      return this.$store.state.shipData.schemaList.shipClasses
    },
    dataPoints () {
      return this.$store.state.shipData.shipClasses
    },
    operators () {
      return this.$store.state.shipData.operators
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-list {
  margin-left: 20px;
  padding-right: 15px;
  max-height: 400px;
  overflow-y: auto;
}
/* scrollbar */
.modal-list::-webkit-scrollbar {
    width: 10px;
}
.modal-list::-webkit-scrollbar-track {
  width: 8px;
  border-radius: 4px;
}
.modal-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.modal-list::-webkit-scrollbar-thumb:hover {
  background: #444;
}

table {
  border-spacing: 0;
  border-collapse: collapse;
}
th, td {
  margin: 0;
  padding: 0 1px;
  height: 20px;
}
td {
  border: 1px solid #555;
}
input, select {
  box-sizing: border-box;
  width: 100px;
  height: 20px;
  line-height: 20px;
  margin: 0;
  padding: 0 1px;
  border: none;
  vertical-align: top;
  border-radius: 0;
}
.operator-header {
  border: 1px solid #555;
  text-transform: capitalize;
}
</style>
