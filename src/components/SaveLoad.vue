<template>
<div id="saveload">
  <button class='storage-button' @click="saveState">{{saveMessage}}</button>
  <button class='storage-button' @click="loadState">{{loadMessage}}</button>
  <button class='storage-button' @click="showAddShipModal = true">Add Ship</button>
  <div class='timeline'>
    <button class='timeline-button fast'>&#x25c4;&#x25c4;</button>
    <button class='timeline-button'>&#x25c4;</button>
    <input spellcheck="false" v-model="dateLabel" placeholder='Current Date'>
    <button class='timeline-button'>&#x25ba;</button>
    <button class='timeline-button fast'>&#x25ba;&#x25ba;</button>
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
      localStorage.setItem(DEPLOYMENT_KEY, JSON.stringify(this.$store.state.timeline))
      this.saveMessage = 'Saved!'
      setTimeout(() => { this.saveMessage = 'Save' }, 1000)
    },
    loadState () {
      this.$store.commit('restoreSave', JSON.parse(localStorage.getItem(DEPLOYMENT_KEY)))
      this.loadMessage = 'Loaded!'
      setTimeout(() => { this.loadMessage = 'Load' }, 1000)
    }
  },
  computed: {
    showAddShipModal: {
      get () {
        return this.$store.state.showAddShip
      },
      set (value) {
        this.$store.commit('updateShowAddShip', value)
      }
    },
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
