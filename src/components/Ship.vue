<template>
<div :class="'ship ' + scale" :id="'ncc-' + registry">
  <img class="ship-image" :src="imgUrl" style="height: 20px; margin: 0px auto;"/>
  <div>
    <span>{{prefix}} <em>{{name}}</em>, NCC-{{registry}}</span>
    <span>
      <span v-for="(stat, i) of statOrder" :key="stat" :class="'stat-' + stat">{{stat}}{{stats[i]}}&nbsp;</span>
    </span>
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
  border: 2px solid;
  border-radius: 0px;
  padding: 10px;
  color: black;
  display: inline-block;
  text-align: center;
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
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
#available-ships .ship:last-child {
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.sector-drag .ship {
  margin: 4px;
}
.sector-drag .ship:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.sector-drag .ship:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

</style>
