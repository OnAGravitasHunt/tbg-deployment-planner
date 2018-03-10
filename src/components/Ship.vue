<template>
<div :class="'ship ' + scale" :id="'ncc-' + registry">
  <!-- <img class="ship-image" :src="imgUrl" style="height: 20px; margin: 0px auto;"/> -->
  <div class='ship-data'>
    <p class='ship-data-item'>{{prefix}} <em>{{name}}</em></p>
    <p class='ship-data-item'>NCC-{{registry}}</p>
    <span class='ship-data-item'>
      <span v-for="(stat, i) of statOrder" :key="stat" :class="'stat-' + stat">{{stat}}{{stats[i]}}&nbsp;</span>
    </span>
  </div>
  <div class='ship-operations'>
    <span class='edit-icon'>&#9998;</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'Ship',
  props: ['registry', 'name', 'shipClass', 'prefix', 'scale', 'stats'],
  // {registry: 2617, name: 'Torch', shipClass: 'Renaissance', prefix: 'USS', scale: 'cruiser', stats: [5, 3, 4, 5, 4, 5]}
  computed: {
    imgUrl () {
      return `/static/${this.shipClass.toLowerCase()}.png`
    }
  },
  data () {
    return {
      statOrder: ['C', 'S', 'H', 'L', 'P', 'D']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.stat-D {
  font-weight: bold;
}
.ship {
  width: 200px;
  height: 100px;
  border: 2px solid;
  border-radius: 0px;
  padding: 10px;
  color: black;
  display: inline-block;
  text-align: center;
  cursor: grab;
}
.ship-data {
  width: 80%;
  height: 80px;
  display: inline-block;
  margin: 0;
}
.ship-operations {
  width: 20%;
  height: 80px;
  display: inline-block;
}
.frigate {
  border-color: #99c;
  background-color: #99c;
}
.cruiser {
  border-color: #c66;
  background-color: #c66;
}
.explorer {
  border-color: #fc9;
  background-color: #fc9;
}
#available-ships .ship {
  margin: 2px auto;
}
#available-ships .ship:first-child {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
#available-ships .ship:last-child {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}
.sector-drag .ship {
  margin: 4px;
}
.sector-drag .ship:first-child {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.sector-drag .ship:last-child {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.edit-icon {
  width: 20px;
  height: 20px;
  float: right;
  display: inline-block;
  transform: rotateZ(70deg);
  cursor: pointer;
}
.ship-data-item {
  margin: 0;
}
</style>
