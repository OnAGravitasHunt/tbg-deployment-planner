<template>
<div id="saveload">
  <button class='storage-button' @click="saveState">{{saveMessage}}</button>
  <button class='storage-button' @click="loadState">{{loadMessage}}</button>
  <button class='storage-button' @click="showAddShipModal = true">Add Ship</button>
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
  background-color: #06a;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 20px;
  outline: none;
  padding: 0px;
  display: inline-block;
  margin: 5px 5px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
button:first-child {
  margin-left: 20px;
}
</style>
