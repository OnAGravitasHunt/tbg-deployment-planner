<template>
<div class='sector' :id="'sector-' + name">
  <div class='sector-header'>
    <span class='sector-name' @click="toggleShow">{{toggleIcon}} {{name}}</span>
    <span class='sector-info'>D{{sectorDef}}/{{def}}</span>
    <span class='sector-info'>S{{sectorSci}}</span>
    <span class='sector-info'>P{{sectorPre}}</span>
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
  props: ['name', 'def', 'index'],
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
        return this.$store.state.deployment.sectors[this.index].ships
      },
      set (value) {
        this.$store.commit('updateSector', {sectorIndex: this.index, shipList: value})
      }
    },
    toggleIcon () {
      return this.sectorShow ? '\u25BC' : '\u25B6'
    }
  },
  methods: {
    onMove (evt) {
      return evt.draggedContext.element.mobile
    },
    onUpdate () {
      console.log('updating')
      this.$store.commit('sortSector', this.index)
    },
    toggleShow () {
      this.sectorShow = !this.sectorShow
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
.sector-show-false {
  display: none;
  visibility: collapse;
}
</style>
