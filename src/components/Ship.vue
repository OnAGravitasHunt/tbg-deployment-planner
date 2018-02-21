<template>
<div class="ship">
  <img class="ship-image" :src="imgUrl()" style="width: 200px"/>
  <div>
    {{prefix}} <em>{{name}}</em>, NCC-{{registry}}<br>
    <span v-for="(stat, i) of statOrder" :key="stat" :class="'stat-' + stat">{{stat}}{{stats[i]}}&nbsp;</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'ship',
  props: ['name', 'prefix', 'shipClass', 'registry', 'stats'],
  methods: {
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
  width: 220px;
  border: 2px solid orange;
  border-radius: 5px;
  padding: 10px;
  margin: 10px auto;
  background-color: orange;
}
</style>
