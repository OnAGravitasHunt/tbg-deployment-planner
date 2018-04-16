<template>
  <td
    class='modal-list-cell'
  >
    <div
      tabindex='-1'
      :class="`cell-div delete ${field.display}`"
      v-if="field.key === 'delete'"
    >&#x2716;</div>

    <div
      @click="editCell"
      @focus="editCell"
      tabindex='0'
      :class="`cell-div ${field.display}`"
      v-else-if="!underEdit && field.type === 'text'"
    >{{displayValue}}</div>

    <input
      :class="`cell-input ${field.display}`"
      v-else-if="underEdit && field.type === 'text'"
      v-model='tempValue'
      v-focus
      @blur="commitEdit"
      @keydown="onKeydown"
    >

    <select
      class='cell-select'
      v-else-if="field.type === 'select'"
      v-model='displayValue'
    >
      <option
        v-for="opt of field.options"
        :key="opt"
      >{{opt}}</option>
    </select>
  </td>
</template>

<script>
import StatPicker from '../StatPicker.vue'

export default {
  name: 'ModalListCell',
  components: {
    StatPicker
  },
  props: ['rowIndex', 'field', 'cellValue'],
  directives: {
    focus: {
      inserted (el) {
        // el.focus()
        el.select()
      }
    }
  },
  data () {
    return {
      underEdit: false,
      displayValue: this.cellValue,
      tempValue: ''
    }
  },
  methods: {
    onKeydown (ev) {
      switch (ev.key) {
        case 'Enter':
          this.commitEdit()
          break
        case 'Escape':
          this.abortEdit()
          break
      }
    },
    editCell ($event) {
      console.log(this.rowIndex, this.field.key)
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
  padding: 0;
  height: 20px;
}
.cell-div {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
}
.wide {
  width: 150px;
}
.narrow {
  width: 30px;
}
.delete {
  color: #c66;
}
input {
  background-color: #888;
  color: white;
  text-align: center;
  box-sizing: border-box;
  width: 150px;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  margin: 0;
  padding: 0;
  border: none;
  vertical-align: top;
  border-radius: 0;
  outline: none;
}
select {
  /* box-sizing: border-box; */
  width: 100px;
  /* height: 20px; */
  /* line-height: 20px; */
  /* margin: 0; */
  /* padding: 0 1px; */
  /* border: none; */
  vertical-align: top;
  /* border-radius: 0; */
}
.stat-input {
  width: 25px;
  border-right: 1px solid black;
}
.stat-display {
  display: inline-block;
  width: 25px;
  border-right: 1px solid black;
}
</style>
