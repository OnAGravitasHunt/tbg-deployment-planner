<template>
  <tr class='modal-list-row'>
    <ModalListCell
      v-for="(field, index) of schema"
      :key="field.key"
      :fieldIndex="index"
      :schema="schema"
      :cellValue="entry[field.key]"
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
        console.log(this)
      }
    }
  },
  props: ['schema', 'entry'],
  data () {
    return {}
  },
  methods: {},
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
