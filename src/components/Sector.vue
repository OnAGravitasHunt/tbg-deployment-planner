<template>
<div class='sector' :id="'sector-' + name">
  <div class='sector-header'>
    <span class='sector-name' @click="toggleShow">{{toggleIcon}} {{name}}</span>
    <span class='sector-info'>D{{sectorDef}}/{{def}}</span>
    <span class='sector-info'>S{{sectorSci}}</span>
    <span class='sector-info'>P{{sectorPre}}</span>
    <button class='sector-edit' @click="editSector">Edit Sector</button>
  </div>
  <div :class="`sector-drag-wrapper sector-show-${sectorShow}`">
    <draggable class='sector-drag'
        :id="'s-drag-' + index"
        v-model="sectorShips"
        :options="{group:'ships'}"
        :move="onMove"
        @change="onUpdate"
        >
      <Ship v-for="ship of sectorShips" :key="ship.registry" v-bind="ship"></Ship>
    </draggable>
  </div>
</div>
</template>

<script>
import Ship from './Ship'
import draggable from 'vuedraggable'

export default {
  name: 'Sector',
  props: ['name', 'def', 'type', 'theatre', 'supporters', 'index'],
  components: {
    Ship,
    draggable
  },
  data () {
    return {
      sectorShow: true
    }
  },
  computed: {
    sectorDef () {
      return this.sectorShips.reduce((acc, curr) => acc + curr.classStats[5] + curr.bonusStats[5], 0)
    },
    sectorSci () {
      return this.sectorShips.reduce((acc, curr) => acc + curr.classStats[1] + curr.veterancy + curr.bonusStats[1], 0)
    },
    sectorPre () {
      return this.sectorShips.reduce((acc, curr) => acc + curr.classStats[4] + curr.veterancy + curr.bonusStats[4], 0)
    },
    sectorShips: {
      get () {
        return this.$store.getters.sectors[this.index].ships
      },
      set (value) {
        this.$store.commit('updateSector', {sectorIndex: this.index, shipList: value})
      }
    },
    toggleIcon () {
      return this.sectorShow ? '\u25BC' : '\u25B6'
    },
    sectorInfoObj () {
      return {
        name: this.name,
        defense: this.def,
        type: this.type,
        theatre: this.theatre,
        supporters: this.supporters
      }
    }
  },
  methods: {
    onMove (evt) {
      return evt.draggedContext.element.mobile
    },
    onUpdate () {
      this.$store.commit('sortSector', this.index)
    },
    toggleShow () {
      this.sectorShow = !this.sectorShow
    },
    editSector () {
      // console.log(this.sectorInfoObj)
      // console.log(this)
      this.$store.commit('setSelectedSectorIndex', this.index)
      this.$store.commit('updateSelectedSectorAllFields', this.sectorInfoObj)
      this.$store.commit('updateShowEditSector', true)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sector {
  /* min-height: 100px; */
  text-align: left;
  padding: 0 30px;
  margin-left: 250px;
  border-bottom: 2px solid white;
}
.sector-drag-wrapper {
  border-top: 1px solid #ccc;
  height: 100px;
  overflow-x: scroll;
  white-space: nowrap;
}
.sector-drag {
  height: inherit;
}
.sector-header {
  padding: 10px 0;
}
.sector-name {
  font-size: 20px;
  font-weight: bold;
}
.sector-info {
  margin-left: 20px;
}
.sector-edit {
  float: right;
  background-color: #c99;
  height: 24px;
  border: none;
  border-radius: 12px;
  outline: none;
  padding: 0 10px;
  vertical-align: top;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* display: inline-block; */
}
.sector-show-false {
  display: none;
  visibility: collapse;
}
</style>
