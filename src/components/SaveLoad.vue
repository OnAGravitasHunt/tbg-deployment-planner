<template>
<div id="saveload">
  <div class='button storage-button' @click="saveState">{{saveMessage}}</div>
  <div class='button storage-button' @click="loadState">{{loadMessage}}</div>
  <div class='button storage-button' @click="addNew">Add...</div>
  <!-- <div class='button storage-button' @click="addShip">Add Ship</div> -->
  <!-- <div class='button storage-button' @click="addSector">Add Sector</div> -->
  <div class='timeline'>
    <div class='button timeline-button' title='Previous tick' @click="() => changeTick(-1)">&#x25C4;</div>
    <div class='button timeline-button delete-button' title='Delete tick' @click="() => deleteTick()">&otimes;</div>
    <input spellcheck="false" v-model="dateLabel" placeholder='Current Date'>
    <div class='button timeline-button' title='Insert new tick' style='line-height: 25px;' @click="() => insertNewTick()"><sub>]</sub><sup>&darr;</sup><sub>[</sub></div>
    <div class='button timeline-button' title='Copy state forwards' @click="() => copyForwards()">&#x21B7;</div>
    <div class='button timeline-button' title='Next tick' @click="() => changeTick(1)">&#x25BA;</div>
  </div>
  <div class='timeline-info'>Currently at {{currentTick + 1}} of {{timelineLength}}</div>
  <div class='button storage-button short-button' title='Download state file' @click="download">&#x21E9;</div>
  <div class='button storage-button short-button' title='Upload state file' @click="$refs.load_file_input.click()">&#x21E7;</div>
  <!--  -->
  <a ref="save_file_a" style="display:none"></a>
  <input style="display:none" type="file" ref="load_file_input" @change="upload" value="Load file"/>
</div>
</template>

<script>
const DEPLOYMENT_KEY = 'deployment'

export default {
  name: 'SaveLoad',
  data () {
    return {
      saveMessage: 'Save',
      loadMessage: 'Load'
    }
  },
  methods: {
    saveState () {
      let save = {
        timeline: this.$store.state.deployment.timeline,
        currentTick: this.$store.state.deployment.currentTick
      }
      localStorage.setItem(DEPLOYMENT_KEY, JSON.stringify(save))
      this.saveMessage = 'Saved!'
      setTimeout(() => { this.saveMessage = 'Save' }, 1000)
    },
    loadState () {
      this.$store.commit('restoreSave', JSON.parse(localStorage.getItem(DEPLOYMENT_KEY)))
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
      this.$store.commit('updateShowAddShip', true)
    },
    addSector () {
      this.$store.commit('clearSelectedSector')
      this.$store.commit('updateShowAddSector', true)
    },
    addShip () {
      this.$store.commit('clearNewShip')
      this.$store.commit('updateShowAddShip', true)
    },
    download () {
      let timestamp = new Date()
      timestamp.setMilliseconds(0)
      const filename = `deployment-${timestamp.toISOString()}.json`
      const data = JSON.stringify(this.$store.state.deployment.timeline)

      let element = this.$refs.save_file_a
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + data)
      element.setAttribute('download', filename)
      element.click()
    },
    upload () {
      let loadFile = this.$refs.load_file_input.files[0]
      let reader = new FileReader()
      let self = this
      reader.onload = function (event) {
        if (reader.readyState === FileReader.DONE) {
          let save = {
            timeline: JSON.parse(reader.result),
            currentTick: 0
          }
          self.$store.commit('restoreSave', save)
        }
      }
      reader.readAsText(loadFile)
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
  width: 100px;
  border-radius: 20px;
  margin: 5px 2px;
}
.short-button {
  width: 60px;
  margin: 5px 0;
}
.button:first-child {
  margin-left: 20px;
}
.timeline {
  margin-left: 80px;
  height: 50px;
  display: inline-block;
  vertical-align: top;
}
.timeline-button {
  padding: 0 5px;
  margin: 5px -0px;
  background-color: #06a;
  color: white;
  /* vertical-align: top; */
  font-size: 22px;
}
.delete-button {
  background-color: #c44;
}
.timeline-button:first-child {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.timeline-button:last-child {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
input {
  height: 40px;
  border: none;
  margin: 5px 0px;
  outline: none;
  padding: 0px;
  font-size: 16px;
  text-align: center;
}
.fast {
  letter-spacing: -10px;
  padding-right: 15px;
  /* padding-right: 10px; */
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
  /* background-color: #06a; */
  color: white;
  border-radius: 20px;
  margin: 5px 5px;
}
</style>
