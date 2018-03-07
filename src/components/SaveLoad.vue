<template>
<div id="saveload">
  <button v-on:click="saveState">{{saveMessage}}</button>
  <button v-on:click="loadState">{{loadMessage}}</button>
  <button v-on:click="showAddShipModal = true">Add Ship</button>
</div>
</template>

<script>
const DEPLOYMENT_KEY = 'deployment'

export default {
  name: 'saveload',
  data () {
    return {
      saveMessage: 'Save',
      loadMessage: 'Load'
    }
  },
  methods: {
    saveState () {
      localStorage.setItem(DEPLOYMENT_KEY, JSON.stringify(this.$store.state))
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
#saveload {
  width: 100%;
  height: 50px;
  background-color: #777;
  position: fixed;
  margin-top: 0;
}
button {
  background-color: #f90;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 5px;
  padding: 0px;
  color: black;
  display: inline-block;
  /* text-align: center; */
  margin: 5px 10px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
