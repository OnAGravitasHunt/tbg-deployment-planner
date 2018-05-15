<template>
  <tr class='modal-list-row'>
    <ModalListCell
      v-for="field of schemaFields"
      :key="field.key"
      :rowIndex="rowIndex"
      :field="field"
      :cellValue="entry[field.key]"
      :operator="operator"
      :currentSchema="currentSchema"
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
  props: ['entry', 'rowIndex', 'operator', 'currentSchema'],
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D']
    }
  },
  methods: {},
  computed: {
    schemaFields () {
      return this.$store.state.shipData.schemaList[this.currentSchema]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
