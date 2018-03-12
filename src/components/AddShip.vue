<template>
<transition name='modal'>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class='modal-container'>
        <!--  -->
        <div class='modal-header'>
          <div class='lcars-bar lcars-bar-left'></div>
          <div class='lcars-bar lcars-bar-main'>Add New Starship</div>
          <div class='lcars-bar lcars-bar-right'></div>

        </div>
        <!--  -->
        <div class='modal-body'>
          <ul class='add-ship-fields'>
            <li>
              <!-- <span>Name: </span> -->
              <select v-model="currentShipPrefix">
                <option v-for="prefix of prefixes" :key="prefix">{{prefix}}</option>
              </select>
              <input v-model="currentShipName" placeholder='Starship name'>
              <span>NCC-</span><input class='registry-input' v-model="currentShipRegistry" placeholder='Registry'>
            </li>
            <li>
              <span>Ship Class: </span>
              <select v-model="currentShipClass">
                <option disabled value="">Select starship class</option>
                <option v-for="shipClass of shipClasses" :key="shipClass.name">{{shipClass.name}}</option>
              </select>
            </li>
            <li>
              <span>Veterancy: </span>
              <select v-model="currentShipVet">
                <option v-for="(vet, i) of veterancies" :value="i" :key="vet">{{vet}}</option>
              </select>
            </li>
            <li>
              <StatChanger :classStats="currentShipClassObject.stats" :veterancy="veterancies.indexOf(currentShipVet)"></StatChanger>
            </li>
          </ul>
        </div>
        <!--  -->
        <div class='modal-footer'>
          <button class='modal-default-button' @click="showAddShipModal = false">Close</button>
          <button class='modal-default-button' @click="commitNewShip">{{addMessage}}</button>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import shipDataFields from '../assets/shipDataFields.json'
import StatChanger from './StatChanger'

export default {
  name: 'AddShip',
  components: {
    StatChanger
  },
  data () {
    return {
      addMessage: 'Add Ship',
      prefixes: shipDataFields.prefixes,
      shipClasses: shipDataFields.shipClasses,
      veterancies: shipDataFields.veterancies
    }
  },
  methods: {
    commitNewShip () {
      if (this.currentShipName.length * this.currentShipRegistry.length * this.currentShipClass.length) {
        this.$store.commit('createNewShip')
        this.addMessage = 'Added'
        this.$store.commit('updateShowAddShip', true)
        setTimeout(() => { this.addMessage = 'Add Ship' }, 1000)
      }
    }
  },
  computed: {
    showAddShipModal: {
      get () {
        return this.$store.state.addShipShow
      },
      set (value) {
        this.$store.commit('updateShowAddShip', value)
      }
    },
    currentShipPrefix: {
      get () {
        return this.$store.state.newShip.prefix
      },
      set (prefix) {
        this.$store.commit('updateNewShipField', {field: 'prefix', value: prefix})
      }
    },
    currentShipName: {
      get () {
        return this.$store.state.newShip.name
      },
      set (shipName) {
        this.$store.commit('updateNewShipField', {field: 'name', value: shipName})
      }
    },
    currentShipRegistry: {
      get () {
        return this.$store.state.newShip.registry
      },
      set (registry) {
        this.$store.commit('updateNewShipField', {field: 'registry', value: registry})
      }
    },
    currentShipClass: {
      get () {
        return this.$store.state.newShip.shipClass
      },
      set (shipClass) {
        this.$store.commit('updateNewShipField', {field: 'shipClass', value: shipClass})
        this.$store.commit('updateNewShipField', {field: 'classStats', value: this.currentShipClassObject.stats})
      }
    },
    currentShipClassStats () {
      return this.$store.state.newShip.classStats
    },
    currentShipVet: {
      get () {
        return this.$store.state.newShip.veterancy
      },
      set (vet) {
        this.$store.commit('updateNewShipField', {field: 'veterancy', value: vet})
      }
    },
    currentShipClassObject () {
      let classObject = this.shipClasses.find(el => el.name === this.currentShipClass)
      if (typeof (classObject) === 'undefined') {
        return {stats: [0, 0, 0, 0, 0, 0]}
      } else {
        this.$store.commit('updateNewShipField', {field: 'scale', value: classObject.scale})
        return classObject
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  /* height: 400px; */
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.add-ship-fields {
  list-style-type:none;
  padding-left: 10px;
}

li {
  margin: 10px 0px;
}

.lcars-bar {
  height: 40px;
  background-color:  #55f;
  margin: 0px;
  display: inline-block;
  vertical-align: top;
}

.lcars-bar-left {
  width: 30px;
  border-radius: 20px 0px 0px 20px;
}

.lcars-bar-main {
  width: 400px;
  font-size: 20px;
  color: #ccc;
  border-radius: 0;
  padding: 0px 10px;
  line-height: 40px;
  text-transform: uppercase;
}

.lcars-bar-right {
  width: 30px;
  border-radius: 0px 20px 20px 0px;
}

button {
  background-color: #55f;
  color: white;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 5px;
  padding: 0px;
  color: #ccc;
  display: inline-block;
  margin: 5px 10px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

input {
  /* width: 50px; */
}
.registry-input {
  width: 60px;
}
</style>
