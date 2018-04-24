<template>
<div id="saveload">
  <div
    class='button storage-button left-button'
    title='Save to local storage'
    @click="saveState"
  >{{saveMessage}}</div><!--
  --><div
    class='button storage-button right-button'
    title='Save to file'
    @click="downloadState"
  >&#x21E9;</div>
  <div
    class='button storage-button left-button'
    title='Load from local storage'
    @click="loadState"
  >{{loadMessage}}</div><!--
  --><div
    class='button storage-button right-button'
    title='Load from file'
    @click="$refs.stateFileInput.click()"
  >&#x21E7;</div>

  <div class='button storage-button' title='Add new item' @click="addNew">New...</div>
  <div class='button storage-button' title='Edit item' @click="editor">Edit...</div>
  <div class='button storage-button' title='BBCode' @click="bbcode">BBCode</div>

  <div class='timeline'>
    <div
      class='button timeline-button'
      title='Previous tick'
      @click="() => changeTick(-1)"
    >&#x25C4;</div><!--
    --><div
      class='button timeline-button delete-button'
      title='Delete tick'
      @click="() => deleteTick()"
    >&otimes;</div><!--
    --><input spellcheck="false" v-model="dateLabel" placeholder='Current Date'><!--
    --><div
      class='button timeline-button'
      title='Insert new tick'
      style='line-height: 25px;'
      @click="() => insertNewTick()"
    ><sub>]</sub><sup>&darr;</sup><sub>[</sub></div><!--
    --><div
      class='button timeline-button'
      title='Copy state forwards'
      @click="() => copyForwards()"
    >&#x21B7;</div><!--
    --><div
      class='button timeline-button'
      title='Next tick'
      @click="() => changeTick(1)"
    >&#x25BA;</div>
  </div>
  <div class='timeline-info'>Tick {{currentTick + 1}}/{{timelineLength}}</div>
  <!--  -->
  <div
    class='button storage-button short-button'
    title='Import ships from CSV'
    @click="$refs.shipCSVInput.click()"
  >&#x21E7;</div>
  <!--  -->
  <a ref="save_file_a" style="display:none"></a>
  <input style="display:none" type="file" ref="stateFileInput" @change="uploadState" value="Load file"/>
  <input style="display:none" type="file" ref="shipCSVInput" @change="uploadCSV" value="Load file"/>
  <BBCode ref='bbcode-button'></BBCode>
</div>
</template>

<script>
import BBCode from './bbcode/BBCode.vue'
import SheetConverter from '../lib/sheet-converter.js'
import Papa from 'papaparse'

const DEPLOYMENT_KEY = 'deployment'
const PAPA_CONFIG = {
  header: true
}

export default {
  name: 'SaveLoad',
  components: {
    BBCode
  },
  data () {
    return {
      saveMessage: 'Save',
      loadMessage: 'Load'
    }
  },
  methods: {
    createSave () {
      return {
        timeline: {
          timeline: this.$store.state.deployment.timeline,
          currentTick: this.$store.state.deployment.currentTick
        },
        data: {
          prefixes: this.$store.state.shipData.prefixes,
          shipClasses: this.$store.state.shipData.shipClasses
        }
      }
    },
    saveState () {
      localStorage.setItem(DEPLOYMENT_KEY, JSON.stringify(this.createSave()))
      this.saveMessage = 'Saved!'
      setTimeout(() => { this.saveMessage = 'Save' }, 1000)
    },
    loadState () {
      this.$store.dispatch('restoreSave', JSON.parse(localStorage.getItem(DEPLOYMENT_KEY)))
      this.loadMessage = 'Loaded!'
      setTimeout(() => { this.loadMessage = 'Load' }, 1000)
    },
    changeTick (delta) {
      this.$store.commit('changeTick', delta)
    },
    copyForwards () {
      this.$store.commit('copyForwards')
    },
    insertNewTick () {
      this.$store.commit('insertNewTick')
    },
    deleteTick () {
      this.$store.commit('deleteTick')
    },
    addNew () {
      this.$store.commit('clearNewShip')
      this.$store.commit('clearSelectedSector')
      this.$store.commit('setModal', 'add-ship')
    },
    downloadState () {
      let timestamp = new Date()
      timestamp.setMilliseconds(0)
      const filename = `deployment-${timestamp.toISOString()}.json`
      const data = JSON.stringify(this.createSave())
      let element = this.$refs.save_file_a
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + data)
      element.setAttribute('download', filename)
      element.click()
    },
    uploadState () {
      let loadFile = this.$refs.stateFileInput.files[0]
      let reader = new FileReader()
      let self = this
      reader.onload = function (event) {
        if (reader.readyState === FileReader.DONE) {
          self.$store.dispatch('restoreSave', JSON.parse(reader.result))
        }
      }
      reader.readAsText(loadFile)
    },
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
    editor () {
      this.$store.commit('setModal', 'modal-list')
    },
    bbcode () {
      this.$refs['bbcode-button'].copyToClipboard()
    }
  },
  computed: {
    dateLabel: {
      get () {
        return this.$store.getters.dateLabel
      },
      set (value) {
        this.$store.commit('setDateLabel', value)
      }
    },
    currentTick () {
      return this.$store.state.deployment.currentTick
    },
    timelineLength () {
      return this.$store.state.deployment.timeline.length
    }
  }
}
</script>

<style scoped>
* {
  z-index: 5;
}
#saveload {
  width: 100%;
  height: 50px;
  background-color: #777;
  position: fixed;
  margin-top: 0;
}
.button {
  text-align: center;
  vertical-align: top;
  height: 40px;
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
.storage-button {
  background-color: #06a;
  color: white;
  width: 80px;
  border-radius: 20px;
  margin: 5px 2px;
}
.left-button {
  padding-left: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin-right: 0;
  width: 60px;
}
.right-button {
  width: 40px;
  padding-right: 5px;
  margin: 5px 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 1px solid #047;
}
.button:first-child {
  margin-left: 20px;
}
.timeline {
  margin-left: 20px;
  height: 50px;
  display: inline-block;
  vertical-align: top;
}
.timeline-button {
  padding: 0 5px;
  margin: 5px 0px;
  background-color: #06a;
  color: white;
  border-right: 1px solid #047;
  font-size: 22px;
}
.delete-button {
  background-color: #c44;
  border-right: 0;
}
.timeline-button:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.timeline-button:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-right: 0;
}
.short-button {
  width: 80px;
}
input {
  height: 40px;
  border: none;
  border-radius: 0;
  margin: 5px 0px;
  outline: none;
  padding: 0px;
  font-size: 16px;
  text-align: center;
}
.fast {
  letter-spacing: -10px;
  padding-right: 15px;
}
.timeline-info {
  height: 40px;
  border: none;
  outline: none;
  padding: 0 10px;
  font-size: 16px;
  line-height: 40px;
  vertical-align: top;
  display: inline-block;
  color: white;
  border-radius: 20px;
  margin: 5px 5px;
}
</style>
