<template>
  <tr class='modal-list-row'>
    <ModalListCell
      v-for="field of schemaFields"
      :key="field.key"
      :rowIndex="rowIndex"
      :field="field"
      :cellValue="spreadStats[field.key]"
    ></ModalListCell>
  </tr>
</template>

<script>
import ModalListCell from './ModalListCell'

export default {
  name: 'ModalListRow',
  components: {
    ModalListCell
  },
  directives: {},
  props: ['schema', 'entry', 'rowIndex'],
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D']
    }
  },
  methods: {},
  computed: {
    spreadStats () {
      if (this.schema === 'shipClasses') {
        let entry = Object.assign({}, this.entry)
        for (let i = 0; i < this.entry.stats.length; i++) {
          entry[this.statOrder[i].toLowerCase()] = this.entry.stats[i]
        }
        return entry
      } else {
        return this.entry
      }
    },
    schemaFields () {
      if (this.schema === 'shipClasses') {
        return [
          {name: 'Class Name', key: 'name', type: 'text', display: 'wide'},
          {name: 'Scale', key: 'scale', type: 'select', options: ['frigate', 'cruiser', 'explorer', 'station']},
          {name: 'C', key: 'c', type: 'text', display: 'narrow'},
          {name: 'S', key: 's', type: 'text', display: 'narrow'},
          {name: 'H', key: 'h', type: 'text', display: 'narrow'},
          {name: 'L', key: 'l', type: 'text', display: 'narrow'},
          {name: 'P', key: 'p', type: 'text', display: 'narrow'},
          {name: 'D', key: 'd', type: 'text', display: 'narrow'},
          {name: '', key: 'delete', type: 'text', display: 'narrow'}
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
