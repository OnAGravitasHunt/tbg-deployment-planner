<template>
  <div>
    [SPOILER={{sector.name}}]
    {{sector.name}}
    [/SPOILER]
  </div>
</template>

<script>
export default {
  name: 'BBSector',
  components: {},
  props: ['sector'],
  methods: {},
  computed: {
    sectors () {
      return this.$store.getters.sectors
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  text-align: center;
  vertical-align: top;
  height: 40px;
  width: 100px;
  background-color: #06a;
  line-height: 40px;
  border: none;
  outline: none;
  padding: 0px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
</style>
