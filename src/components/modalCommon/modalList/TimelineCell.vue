<template>
  <td class='timeline-cell'>
    <div
      class='cell-div'
      :class="[field.display, field.key]"
      v-if="field.type === 'text'"
    >{{cellValue}}, ({{rowIndex}})</div>

    <div
      class='cell-div button'
      :class="[field.display, field.key]"
      v-else-if="field.key === 'copy'"
      @click="clickHandler"
    >Copy</div>

    <div
      class='cell-div button'
      :class="[field.display, field.key]"
      v-else-if="field.key === 'paste'"
      @click="clickHandler"
    >Paste</div>

    <div
      class='cell-div checkbox'
      :class="[field.display, field.key]"
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
    clickHandler () {
      if (this.field.key === 'copy') {
        // handle copy
        this.$store.commit('copyTick', this.rowIndex)
      } else if (this.field.key === 'paste') {
        // handle paste
        this.$store.commit('pasteTick', this.rowIndex)
      }
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
.button {
  border-radius: 2px;
  margin: 1px 3px;
}
.copy {
  background-color: #3a4;
}
.paste {
  background-color: #34a;
}
</style>
