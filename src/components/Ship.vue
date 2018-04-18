<template>
<div @dblclick='unassignShip' :class="`ship ${scale} vis-${filterShow}`" :id="'ncc-' + registry">
  <div class='ship-data'>
    <p class='ship-data-item'>{{prefixDisplay}}<em>{{name}}</em></p>
    <p class='ship-data-item' v-html="displayClassName"></p>
    <p class='ship-data-item'>
      <span
        v-for="(stat, i) of statOrder"
        :key="stat"
        :class="`stat-${stat}`"
        v-if="showStat(stat)"
      >{{stat}}{{stats[i]}}&nbsp;</span>
    </p>
  </div>
  <div class='ship-operations'>
    <span class='icon info-icon' @click="displayMoreInfo">&#9432;</span>
    <span class='icon edit-icon' @click="editShip">&#9998;</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Ship',
  props: ['registry'],
  computed: {
    name () {
      return this.shipObj.name
    },
    shipClass () {
      return this.shipObj.shipClass
    },
    prefix () {
      return this.shipObj.prefix
    },
    scale () {
      return this.shipObj.scale
    },
    classStats () {
      return this.shipObj.classStats
    },
    veterancy () {
      return this.shipObj.veterancy
    },
    bonusStats () {
      return this.shipObj.bonusStats
    },
    mobile () {
      return this.shipObj.mobile
    },
    imgUrl () {
      return `/static/${this.shipClass.toLowerCase()}.png`
    },
    prefixDisplay () {
      return this.prefix === 'No prefix' ? '' : `${this.prefix} `
    },
    filterShow () {
      return (this.$store.state.filtering.filterCategories.shipClass[this.shipClass]
        && this.$store.state.filtering.filterCategories.scale[this.scale])
        || this.$parent.$attrs.id !== 'available-ships'
    },
    stats () {
      return this.classStats.map((stat, i) => stat + this.bonusStats[i] + this.veterancy * this.vetStats[i])
    },
    shipObj () {
      return this.$store.getters.shipObjects[this.registry]
    },
    displayClassName () {
      let bits = this.shipClass.split('-')
      if (bits.length === 1) {
        return `<em>${bits[0]}</em>`
      } else {
        return `<em>${bits[0]}</em>-${bits[1]}`
      }
    }
  },
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D'],
      vetStats: [1, 1, 1, 1, 1, 0]
    }
  },
  methods: {
    editShip () {
      this.$store.commit('setEditShipTargetParent', this.$parent.$attrs.id)
      this.$store.commit('updateNewShipAllFields', this.shipObj)
      this.$store.commit('setModal', 'ship-edit')
    },
    displayMoreInfo () {
      this.$store.commit('setEditShipTargetParent', this.$parent.$attrs.id)
      this.$store.commit('updateNewShipAllFields', this.shipObj)
      this.$store.commit('setModal', 'ship-info')
    },
    unassignShip (event) {
      if (this.$parent.$attrs.id !== 'available-ships') {
        let i = Number(this.$parent.$attrs.id.split('-').pop())
        let newSector = this.$store.getters.sectors[i].ships.filter(el => el.registry !== this.registry)
        this.$store.commit('updateSector', {sectorIndex: i, shipList: newSector})
        this.$store.commit('updateAvailAppend', this.shipObj)
      }
    },
    showStat (stat) {
      if (this.shipClass === 'Other Outposts') {
        return stat === 'D'
      } else {
        return true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stat-D {
  font-weight: bold;
}
/*.stat-C, .stat-H, .stat-L {
  display: none;
}*/
.ship {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 15px;
  width: 200px;
  height: 60px;
  border-radius: 0px;
  padding: 10px;
  color: #222;
  display: inline-flex;
  flex-flow: row wrap;
  text-align: center;
  cursor: grab;
}
.ship-data {
  width: 170px;
  height: 60px;
  display: inline-flex;
  flex-flow: row wrap;
  margin: 0px;
}
.ship-operations {
  width: 20px;
  height: 60px;
  display: inline-flex;
  flex-flow: row wrap;
}
.frigate {
  background-color: #99c;
}
.cruiser {
  background-color: #c66;
}
.explorer {
  background-color: #c60;
}
.station {
  background-color: #6c6;
}
.station em {
  font-style: normal;
}
.icon {
  width: 20px;
  height: 20px;
  float: right;
  display: inline-block;
  cursor: pointer;
}
.edit-icon {
  transform: rotateZ(70deg);
  z-index: 0;
}
.ship-data-item {
  width: 100%;
  margin: 0px;
}
#available-ships .ship {
  margin: 2px auto;
}
/* #available-ships .ship:first-child {
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
#available-ships .ship:last-child {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
} */
.sector-drag .ship {
  margin: 4px;
}
.sector-drag .ship:first-child {
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
.sector-drag .ship:last-child {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}
#available-ships .vis-false {
  display: none;
}
</style>
