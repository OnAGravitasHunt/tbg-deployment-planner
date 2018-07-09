<template>
  <span
    class='bb-ship'
  >{{showPrefix}}{{ship.name}}<span
    v-if="ship.scale !== 'station'"
  >, {{ship.shipClass}} {{showVet}}</span></span>
</template>

<script>
export default {
  name: 'BBShip',
  components: {},
  props: ['ship'],
  methods: {},
  computed: {
    isStation () {
      return this.ship.scale === 'station'
    },
    showVet () {
      return ['(G)', '(B)', '(V)', '(E)'][this.ship.veterancy]
    },
    showPrefix () {
      return this.ship.prefix === 'Starbase' ? 'Starbase ' : ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bb-ship {
  display: inline-block;
}
</style>
