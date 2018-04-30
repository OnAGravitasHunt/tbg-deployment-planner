<template>
  <div class='import-export'>
    <ul class='imp-exp-tasks'>
      <li>
        <div
          class='button green'
          title='Import ships from CSV'
          @click="$refs.shipCSVInput.click()"
        >Import ships from CSV</div>
        <input style="display:none" type="file" ref="shipCSVInput" @change="uploadCSV" value="Load file"/>
      </li>
      <li>
        <div
          class='button blue'
          title='BBCode' @click="bbcode"
        >Copy BBCode to clipboard</div>
        <BBCode ref='bbcode-button'></BBCode>
      </li>
    </ul>
  </div>
</template>

<script>
import Papa from 'papaparse'
import SheetConverter from '../../lib/sheet-converter.js'
import BBCode from '../bbcode/BBCode.vue'

const PAPA_CONFIG = {
  header: true
}

export default {
  name: 'ImportExport',
  components: {
    BBCode
  },
  methods: {
    uploadCSV () {
      let loadFile = this.$refs.shipCSVInput.files[0]
      let reader = new FileReader()
      let self = this
      reader.onload = function (event) {
        if (reader.readyState === FileReader.DONE) {
          let ships = Papa.parse(reader.result.substring(reader.result.indexOf('\n') + 1), PAPA_CONFIG)
          ships = new SheetConverter(ships).convert()
          let newShips = Object.keys(ships).filter(ship => !self.$store.getters.shipObjects.hasOwnProperty(ship))
          self.$store.commit('updateAllShipObjects', ships)
          self.$store.commit('updateAvail', self.$store.getters.unassignedShips.concat(newShips))
          self.$store.commit('sortAvail')
        }
      }
      reader.readAsText(loadFile)
    },
    bbcode () {
      this.$refs['bbcode-button'].copyToClipboard()
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.import-export {
  margin: 20px 0;
  display: inline-block;
  vertical-align: top;
}
.imp-exp-tasks {
  list-style-type:none;
  padding-left: 10px;
}
li {
  margin: 10px 0px;
}
.button {
  margin-left: 20px;
  text-align: center;
  vertical-align: top;
  height: 40px;
  width: 250px;
  line-height: 40px;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
.blue {
  background-color: #06a;
}
.green {
  background-color: #1a1;
}
</style>
