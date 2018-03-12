<template>
<div :class="`ship ${scale} vis-${filterShow}`" :id="'ncc-' + registry">
  <!-- <img class="ship-image" :src="imgUrl" style="height: 20px; margin: 0px auto;"/> -->
  <div class='ship-data'>
    <p class='ship-data-item'>NCC-{{registry}}</p>
    <p class='ship-data-item'>{{prefix}} <em>{{name}}</em></p>
    <p class='ship-data-item'>
      <span v-for="(stat, i) of statOrder" :key="stat" :class="'stat-' + stat">{{stat}}{{stats[i]}}&nbsp;</span>
    </p>
  </div>
  <div class='ship-operations'>
    <span class='icon info-icon'>&#9432;</span>
    <span class='icon edit-icon'>&#9998;</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Ship',
  props: ['registry', 'name', 'shipClass', 'prefix', 'scale', 'classStats', 'veterancy', 'bonusStats'],
  computed: {
    imgUrl () {
      return `/static/${this.shipClass.toLowerCase()}.png`
    },
    filterShow () {
      return this.$store.state.filterCategories.shipClass[this.shipClass] && this.$store.state.filterCategories.scale[this.scale]
    },
    stats () {
      return this.classStats.map((stat, i) => stat + this.bonusStats[i] + this.veterancy * this.vetStats[i])
    }
  },
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D'],
      vetStats: [1, 1, 1, 1, 1, 0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stat-D {
  font-weight: bold;
}
.ship {
  font-family: 'Avenir';
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
  width: 170px;
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
  visibility: collapse;
}
</style>
