<template>
<div class='sector' :id="'sector-' + name">
  <h3>{{name}} &ndash; D{{sectorDef}}/{{def}}</h3>
  <draggable class='sector-drag' v-model="currentShips" :options="{group:'ships'}">
    <Ship v-for="ship of currentShips" :key="ship.registry" v-bind="ship"></Ship>
  </draggable>
</div>
</template>

<script>
import Ship from './Ship'
import draggable from 'vuedraggable'

export default {
  name: 'Sector',
  props: ['name', 'def', 'ships'],
  components: {
    Ship,
    draggable
  },
  data () {
    return {
      currentShips: this.ships
    }
  },
  computed: {
    sectorDef () {
      return this.currentShips.reduce((acc, curr) => acc + curr.stats[5], 0)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sector {
  min-height: 100px;
  text-align: left;
  padding-left: 30px;
  margin-left: 250px;
}
.sector-drag {
  min-height: inherit;
}
</style>
