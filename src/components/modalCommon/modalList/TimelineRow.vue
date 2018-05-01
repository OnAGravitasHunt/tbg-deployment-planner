<template>
  <tr class='modal-list-row'>
    <TimelineCell
      v-for="field of schemaFields"
      :key="field.key"
      :rowIndex="rowIndex"
      :field="field"
      :cellValue="entry[field.key]"
      :operator="operator"
    ></TimelineCell>
  </tr>
</template>

<script>
import TimelineCell from './TimelineCell'

export default {
  name: 'TimelineRow',
  components: {
    TimelineCell
  },
  props: ['entry', 'rowIndex', 'operator'],
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D']
    }
  },
  methods: {},
  computed: {
    schemaFields () {
      return [
        {name: 'Tick Name', key: 'dateLabel', type: 'text', display: 'wide'},
        {name: 'Copy', key: 'copy', type: 'button', display: 'narrow'},
        {name: 'Paste', key: 'paste', type: 'button', display: 'narrow'},
        {name: 'Export?', key: 'export', type: 'check', display: 'narrow'}
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
