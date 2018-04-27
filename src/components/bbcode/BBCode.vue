<template>
  <div class='bbcode-export'>
    <div ref='bbcode-root'>
      [SPOILER=Deployment]
      <!-- <BBTheatre v-for="theatre of theatres" :theatreName="theatre" :key="theatre"></BBTheatre> -->
      <BBSector v-for="sector of sectors" :sector="sector" :key="`${sector.theatre}-${sector.name}`"></BBSector>
      [/SPOILER]
    </div>
  </div>
</template>

<script>
import BBSector from './BBSector'

export default {
  name: 'BBCode',
  components: {
    BBSector
  },
  methods: {
    copyToClipboard () {
      navigator.clipboard.writeText(this.$refs['bbcode-root'].innerText).then(function () {
        console.log('Copied to clipboard successfully!')
      }, function () {
        console.error('Unable to write to clipboard.')
      })
    }
  },
  computed: {
    theatres () {
      return this.$store.getters.theatreList
    },
    sectors () {
      return this.$store.getters.sectors
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bbcode-export {
  display: none;
}
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
