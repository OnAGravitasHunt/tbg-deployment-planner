<template>
  <div id="app">
    <planner></planner>
  </div>
</template>

<script>
import planner from './components/Planner'

export default {
  name: 'app',
  components: {
    planner
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
