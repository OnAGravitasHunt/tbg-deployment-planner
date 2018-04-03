<template>
  <div class='add-ship'>
    <ul class='add-ship-fields'>
      <li>
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
        this.$store.dispatch('createNewShip')
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
        return this.$store.state.shipEditing.newShip.prefix
      },
      set (prefix) {
        this.$store.commit('updateNewShipField', {field: 'prefix', value: prefix})
      }
    },
    currentShipName: {
      get () {
        return this.$store.state.shipEditing.newShip.name
      },
      set (shipName) {
        this.$store.commit('updateNewShipField', {field: 'name', value: shipName})
      }
    },
    currentShipRegistry: {
      get () {
        return this.$store.state.shipEditing.newShip.registry
      },
      set (registry) {
        this.$store.commit('updateNewShipField', {field: 'registry', value: registry})
      }
    },
    currentShipClass: {
      get () {
        return this.$store.state.shipEditing.newShip.shipClass
      },
      set (shipClass) {
        this.$store.commit('updateNewShipField', {field: 'shipClass', value: shipClass})
        this.$store.commit('updateNewShipField', {field: 'classStats', value: this.currentShipClassObject.stats})
      }
    },
    currentShipClassStats () {
      // console.log(this.$store.state.shipEditing.newShip)
      return this.$store.state.shipEditing.newShip.classStats
    },
    currentShipVet: {
      get () {
        return this.$store.state.shipEditing.newShip.veterancy
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
.add-sector {
  margin: 20px 0;
  display: inline-block;
  vertical-align: top;
}
.add-ship-fields {
  list-style-type:none;
  padding-left: 10px;
}
li {
  margin: 10px 0px;
}
.registry-input {
  width: 60px;
}
</style>
