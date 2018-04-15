<template>
  <tr class='modal-list-row'>
    <ModalListCell
      v-for="(field, index) of schemaFields"
      :key="field.key"
      :fieldIndex="index"
      :schema="schema"
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
  directives: {
    load: {
      bind (el) {
        // console.log(this)
      }
    }
  },
  props: ['schema', 'entry'],
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
        console.log(entry)
        return entry
      } else {
        return this.entry
      }
    },
    schemaFields () {
      if (this.schema === 'shipClasses') {
        return [
          {name: 'Class Name', key: 'name', type: 'text'},
          {name: 'Scale', key: 'scale', type: 'select', options: ['frigate', 'cruiser', 'explorer', 'station']},
          {name: 'C', key: 'c', type: 'text', display: 'short'},
          {name: 'S', key: 's', type: 'text', display: 'short'},
          {name: 'H', key: 'h', type: 'text', display: 'short'},
          {name: 'L', key: 'l', type: 'text', display: 'short'},
          {name: 'P', key: 'p', type: 'text', display: 'short'},
          {name: 'D', key: 'd', type: 'text', display: 'short'}
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
