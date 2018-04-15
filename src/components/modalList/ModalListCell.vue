<template>
  <td
    @click="editCell"
    @focus="editCell"
    class='modal-list-cell'>
    <div
      class='cell-div'
      v-show="!underEdit && field.type === 'text'"
    >{{displayValue}}</div>

    <input
      class='cell-input'
      v-if="underEdit && field.type === 'text'"
      v-model='tempValue'
      v-focus
      @blur="commitEdit"
      @keydown="onKeydown"
    >

    <select
      class='cell-select'
      v-if="field.type === 'select'"
      v-model='displayValue'
      @blur="commitEdit"
      @keydown="onKeydown"
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
      // console.log(this.field)
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
  computed: {
    field () {
      return this.schemaFields[this.fieldIndex]
    },
    schemaFields () {
      if (this.schema === 'shipClasses') {
        return [
          {name: 'Class Name', key: 'name', type: 'text'},
          {name: 'Scale', key: 'scale', type: 'select', options: ['frigate', 'cruiser', 'explorer', 'station']},
          {name: 'C', key: 'c', type: 'text'},
          {name: 'S', key: 's', type: 'text'},
          {name: 'H', key: 'h', type: 'text'},
          {name: 'L', key: 'l', type: 'text'},
          {name: 'P', key: 'p', type: 'text'},
          {name: 'D', key: 'd', type: 'text'}
        ]
      } else {
        return [
          {name: 'Class Name', key: 'name', type: 'text'},
          {name: 'Scale', key: 'scale', type: 'select', options: ['frigate', 'cruiser', 'explorer', 'station']},
          {name: 'Class Stats', key: 'stats', type: 'text'}
        ]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  text-align: center;
  border: 1px solid #555;
  margin: 0;
  padding: 0;
  min-width: 100px;
  height: 20px;
}
.cell-div {
  width: 150px;
  height: 20px;
  line-height: 20px;
  /* padding: 0px 4px; */
  font-size: 16px;
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
