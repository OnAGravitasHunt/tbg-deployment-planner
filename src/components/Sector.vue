<template>
<div :class="`sector ${sectorTypeCSS}`" :id="'sector-' + name">
  <div class='sector-header'>
    <span class='sector-name' @click="toggleShow">{{toggleIcon}} {{name}}</span>
    <span class='sector-info'>D{{sectorStats[5]}}/{{defense}}</span>
    <span class='sector-info'>C{{sectorStats[0]}}</span>
    <span class='sector-info'>S{{sectorStats[1]}}</span>
    <span class='sector-info'>P{{sectorStats[4]}}</span>
    <button class='sector-edit' @click="editSector">Edit Sector</button>
  </div>
  <div :class="`ship-summary sector-show-${!sectorShow}`">
    <span v-for="shipClass of Object.keys(shipSummary)" :key="shipClass" class='sector-info'>
      {{shipSummary[shipClass]}} {{shipClass}}
    </span>
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
  props: ['name', 'defense', 'type', 'theatre', 'supporters', 'index'],
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
    sectorStats () {
      let stats = []
      for (var i = 0; i < 5; i++) {
        stats[i] = this.sectorShips.reduce((acc, curr) => acc + curr.classStats[i] + curr.veterancy + curr.bonusStats[i], 0)
      }
      stats[5] = this.sectorShips.reduce((acc, curr) => acc + curr.classStats[5] + curr.bonusStats[5], 0)
      return stats
    },
    sectorShips: {
      get () {
        return this.$store.getters.sectors[this.index].ships
      },
      set (value) {
        this.$store.commit('updateSectorField', {sectorIndex: this.index, field: 'ships', value: value})
      }
    },
    toggleIcon () {
      return this.sectorShow ? '\u25BC' : '\u25B6'
    },
    sectorInfoObj () {
      return {
        name: this.name,
        defense: this.defense,
        type: this.type,
        theatre: this.theatre,
        supporters: this.supporters
      }
    },
    sectorTypeCSS () {
      return this.type.replace(' ', '-').toLowerCase()
    },
    shipSummary () {
      let ships = this.sectorShips.map(ship => ship.shipClass)
      let summ = {}
      for (let className of ships) {
        summ[className] = summ[className] ? summ[className] + 1 : 1
      }
      console.log()
      return summ
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
      this.$store.commit('setSelectedSectorIndex', this.index)
      this.$store.commit('updateSelectedSectorAllFields', this.sectorInfoObj)
      this.$store.commit('updateShowEditSector', true)
    },
    displayClassName (className) {
      let bits = className.split('-')
      if (bits.length === 1) {
        return `<em>${bits[0]}</em>`
      } else {
        return `<em>${bits[0]}</em>-${bits[1]}`
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sector {
  text-align: left;
  padding: 0 30px;
  margin-left: 250px;
  border-bottom: 2px solid white;
}
.core .sector-header {

}
.task-force {
  background-color: #888;
  color: black;
}
.task-force .sector-drag-wrapper {
  border-top: 1px solid #333;
}
.sector-drag-wrapper {
  margin-top: 10px;
  border-top: 1px solid #ccc;
  height: 110px;
  overflow-x: scroll;
  white-space: nowrap;
}
.sector-drag {
  height: inherit;
}
.sector-header {
  padding: 10px 0 0 0;
}
.sector-name {
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  min-width: 150px;
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
.ship-summary {
  padding-bottom: 10px;
}
</style>
