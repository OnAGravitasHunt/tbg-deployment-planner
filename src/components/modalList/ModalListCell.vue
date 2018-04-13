<template>
  <td
    @click="editCell"
    @focus="editCell"
    class='modal-list-cell'>
    <span
      class='cell-span'
      v-show='!underEdit'
    >{{displayValue}}</span>

    <input
      class='cell-input'
      v-if="underEdit && type === 'text'"
      v-model='tempValue'
      v-focus
      @blur="commitEdit"
      @keydown="onKeydown"
    >

    <select
      class='cell-input'
      v-if="underEdit && type === 'select'"
      v-model='tempValue'
      @blur="commitEdit"
      @keydown="onKeydown"
    >
      <option v-for="opt of schema[fieldIndex].options"></option>
    </select>
  </td>
</template>

<script>
export default {
  name: 'ModalListCell',
  components: {},
  props: ['fieldIndex', 'cellValue', 'schema'],
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  data () {
    return {
      type: this.schema[this.fieldIndex],
      underEdit: false,
      displayValue: this.cellValue,
      tempValue: ''
    }
  },
  methods: {
    onKeydown (ev) {
      switch (ev.key) {
        case 'Enter':
          // leave focus and let the app save changes
          this.commitEdit()
          break
        case 'Escape':
          this.abortEdit()
          break
      }
    },
    editCell () {
      console.log(this.schema[this.fieldIndex])
      this.underEdit = true
      this.tempValue = this.displayValue
    },
    commitEdit () {
      this.displayValue = this.tempValue
      this.underEdit = false
    },
    abortEdit () {
      this.tempValue = this.displayValue
      this.underEdit = false
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  text-align: center;
  border: 1px solid #555;
  margin: 0;
  padding: 0 1px;
  min-width: 100px;
  height: 20px;
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
