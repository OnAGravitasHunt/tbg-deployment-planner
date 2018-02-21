<template>
  <div id="app">
    <Ship name="Torch" prefix="USS" shipClass="Renaissance" registry="2617" :stats="[5,3,4,5,4,5]"></Ship>
  </div>
</template>

<script>
import Ship from './components/Ship'

export default {
  name: 'App',
  components: {
    Ship
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
