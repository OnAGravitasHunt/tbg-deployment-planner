<template>
  <td class='timeline-cell'>
    <div
      tabindex='-1'
      class='cell-div delete'
      :class="field.display"
      v-if="field.key === 'delete'"
      @click="deleteRow"
    >&#x2716;</div>

    <div
      class='cell-div'
      :class="field.display"
      v-else-if="field.type === 'text'"
    >{{cellValue}}</div>

    <div
      class='cell-div button'
      :class="field.display"
      v-else-if="field.type === 'button'"
    >(B)</div>

    <div
      class='cell-div checkbox'
      :class="field.display"
      v-else-if="field.type === 'check'"
    ><input type='checkbox' v-model="exportBox"></div>
  </td>
</template>

<script>
export default {
  name: 'TimelineCell',
  props: ['rowIndex', 'field', 'cellValue', 'operator'],
  data () {
    return {
      underEdit: false,
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
    editCell () {
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
    },
    deleteRow () {
      this.$store.dispatch('deleteRowAction', {operator: this.operator, rowIndex: this.rowIndex})
    }
  },
  computed: {
    currentSchema () {
      return this.$store.state.shipData.currentSchema
    },
    exportArray: {
      get () {
        return this.$store.state.deployment.exportArray
      },
      set (value) {
        this.$store.commit('setExportArray', this.$store.state.deployment.exportArray.splice(this.rowIndex, 1, value))
      }
    },
    exportBox: {
      get () {
        return this.$store.state.deployment.timeline[this.rowIndex].bbExport
      },
      set (value) {
        this.$store.commit('setExport', {index: this.rowIndex, value: value})
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
  width: 60px;
}
.delete {
  color: #c66;
}
.checkbox {
  text-align: center;
  vertical-align: middle;
}
</style>
