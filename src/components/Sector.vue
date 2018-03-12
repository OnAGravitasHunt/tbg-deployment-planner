<template>
<div class='sector' :id="'sector-' + name">
  <h3>{{name}} &ndash; D{{sectorDef}}/{{def}}</h3>
  <div class='sector-drag-wrapper'>
    <draggable class='sector-drag' :id="'s-drag-' + index" v-model="sectorShips" :options="{group:'ships'}">
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
  computed: {
    sectorDef () {
      return this.sectorShips.reduce((acc, curr) => acc + curr.classStats[5] + curr.bonusStats[5], 0)
    },
    sectorShips: {
      get () {
        return this.$store.state.deployment.sectors[this.index].ships
      },
      set (value) {
        this.$store.commit('updateSector', {sectorIndex: this.index, shipList: value})
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sector {
  min-height: 100px;
  text-align: left;
  padding: 0 30px;
  margin-left: 250px;
}
.sector-drag-wrapper {
  height: 100px;
  overflow-x: scroll;
  white-space: nowrap;
}
.sector-drag {
  height: inherit;
}
</style>
