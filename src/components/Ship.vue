<template>
<div class="ship">
  <img class="ship-image" :src="imgUrl()" style="height: 20px; margin: 0px auto;"/>
  <div>
    {{spec.prefix}} <em>{{spec.name}}</em>, NCC-{{spec.registry}}<br>
    <span v-for="(stat, i) of statOrder" :key="stat" :class="'stat-' + stat">{{stat}}{{spec.stats[i]}}&nbsp;</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'ship',
  props: ['spec'],
  methods: {
    imgUrl () {
      return `/static/${this.spec.shipClass.toLowerCase()}.png`
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
  border: 2px solid orange;
  border-radius: 5px;
  padding: 10px;
  background-color: orange;
  display: inline-block;
  text-align: center;
}
#available-ships .ship {
  margin: 2px auto;
}
.sector-drag .ship {
  margin: 0 4px;
}
</style>
