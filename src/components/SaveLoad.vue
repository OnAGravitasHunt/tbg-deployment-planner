<template>
<div id="saveload">
  <button class='storage-button' @click="saveState">{{saveMessage}}</button>
  <button class='storage-button' @click="loadState">{{loadMessage}}</button>
  <button class='storage-button' @click="addShip">Add Ship</button>
  <button class='storage-button' @click="addSector">Add Sector</button>
  <div class='timeline'>
    <!-- <button class='timeline-button fast'>&#x25c4;&#x25c4;</button> -->
    <button class='timeline-button' title='Previous tick' @click="() => changeTick(-1)">&#x25C4;</button>
    <input spellcheck="false" v-model="dateLabel" placeholder='Current Date'>
    <button class='timeline-button' title='Copy state forwards' @click="() => copyForwards()">&#x21B7;</button>
    <button class='timeline-button' title='Next tick' @click="() => changeTick(1)">&#x25BA;</button>
    <!-- <button class='timeline-button fast'>&#x25ba;&#x25ba;</button> -->
  </div>
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
    addSector () {
      this.$store.commit('clearSelectedSector')
      this.$store.commit('updateShowAddSector', true)
    },
    addShip () {
      this.$store.commit('clearNewShip')
      this.$store.commit('updateShowAddShip', true)
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
button {
  height: 40px;
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
  margin: 5px 5px;
}
button:first-child {
  margin-left: 20px;
}
.timeline {
  margin-left: 80px;
  height: 50px;
  /* width: 300px; */
  /* background-color: green; */
  display: inline-block;
  vertical-align: top;
}
.timeline-button {
  padding: 0 5px;
  margin: 5px -0px;
  background-color: #06a;
  color: white;
  vertical-align: top;
  font-size: 22px;
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
</style>