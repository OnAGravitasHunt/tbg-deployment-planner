<template>
  <div class='bbcode-export'>
    <div v-if="timeline.length" ref='bbcode-root'>
      [SPOILER=Deployment]
      <BBTheatre
        v-for="theatre of theatres"
        :theatreName="theatre"
        :timeline="refactoredTimeline"
        :key="theatre"
      ></BBTheatre>
      [/SPOILER]
    </div>
  </div>
</template>

<script>
import BBTheatre from './BBTheatre'

export default {
  name: 'BBCode',
  components: {
    BBTheatre
  },
  methods: {
    copyToClipboard () {
      if (this.$refs['bbcode-root']) {
        navigator.clipboard.writeText(this.$refs['bbcode-root'].innerText).then(() => {
          console.log('Copied to clipboard successfully!')
        }).catch((e) => {
          console.log(e)
        })
      } else {
        alert('Select ticks to export')
      }
    }
  },
  computed: {
    timeline () {
      return this.$store.state.deployment.timeline.filter(tick => tick.bbExport)
    },
    refactoredTimeline () {
      let refactor = JSON.parse(JSON.stringify(this.timeline[0]))
      delete refactor.dateLabel
      delete refactor.bbExport
      for (let sectorName of Object.keys(refactor.sectors)) {
        // console.log(sectorName, refactor.sectors[sectorName])
        refactor.sectors[sectorName].ships = []
        for (let tick of this.timeline) {
          refactor.sectors[sectorName].ships.push({
            dateLabel: tick.dateLabel,
            ships: JSON.parse(JSON.stringify(tick.sectors[sectorName].ships))
          })
        }
        // console.log(refactor.sectors[sectorName])
      }
      return refactor
    },
    theatres () {
      return this.refactoredTimeline.theatreList
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
