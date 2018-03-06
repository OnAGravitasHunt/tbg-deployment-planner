<template>
  <div id="app">
    <SaveLoad></SaveLoad>
    <Planner></Planner>
  </div>
</template>

<script>
import Planner from './components/Planner'
import SaveLoad from './components/SaveLoad'

export default {
  name: 'app',
  components: {
    Planner,
    SaveLoad
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
body {
  margin: 0;
}
</style>
