<template>
<div class="ship">
  <img :src='imgUrl()'/>
  <p>{{prefix}} {{name}}</p>
  <p>
    <span v-for="(stat, i) of statOrder" :key="stat">{{stat}}{{stats[i]}}&nbsp;</span>
  </p>
</div>
</template>

<script>
export default {
  name: 'ship',
  props: ['name', 'prefix', 'shipClass', 'registry', 'stats'],
  methods: {
    imgUrl () {
      return `../assets/${this.shipClass.toLowerCase()}.png`
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
h1,
h2 {
  font-weight: normal;
}
</style>
