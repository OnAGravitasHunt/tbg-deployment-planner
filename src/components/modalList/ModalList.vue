<template>
  <div class='modal-list'>
    <table>
      <tr>
        <th v-for="field of currentSchema" :key="field.name">{{field.name}}</th>
      </tr>
      <ModalListRow
        v-for="(entry, index) of dataPoints"
        :key="entry.className"
        schema="shipClasses"
        :entry="entry"
        :rowIndex="index"
      ></ModalListRow>
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
  data () {
    return {
      currentSchema: [
        {name: 'Class Name', key: 'name', type: 'text'},
        {name: 'Scale', key: 'scale', type: 'text', options: ['frigate', 'cruiser', 'explorer', 'station']},
        {name: 'C', key: 'c', type: 'text'},
        {name: 'S', key: 's', type: 'text'},
        {name: 'H', key: 'h', type: 'text'},
        {name: 'L', key: 'l', type: 'text'},
        {name: 'P', key: 'p', type: 'text'},
        {name: 'D', key: 'd', type: 'text'},
        {name: '', key: 'delete', type: 'text'}
      ]
    }
  },
  methods: {},
  computed: {
    dataPoints () {
      return this.$store.state.shipData.shipClasses
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-list {
  margin-left: 20px;
  padding-right: 15px;
  height: 300px;
  overflow-y: auto;
  /* overflow-x: visible; */
}
table {
  border-spacing: 0;
  border-collapse: collapse;
  /* table-layout: fixed; */
}
th, td {
  margin: 0;
  padding: 0 1px;
  /* width: 100px; */
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
</style>
