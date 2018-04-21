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
        <multiselect
          v-model="currentShipClass"
          :options="multiselectOptions"
          :multiple="false"
          group-values="shipClasses"
          group-label="operator"
          placeholder="Type to Search"
        ><span slot="noResult">None found.</span></multiselect>
      </li>
      <li>
        <span>Veterancy: </span>
        <select v-model="currentShipVet">
          <option v-for="(vet, i) of veterancies" :value="i" :key="vet">{{vet}}</option>
        </select>
      </li>
      <li>
        <StatChanger></StatChanger>
      </li>
    </ul>
  </div>
</template>

<script>
import shipDataFields from '../assets/shipDataFields.json'
import StatChanger from './StatChanger'
import multiselect from 'vue-multiselect'

export default {
  name: 'AddShip',
  components: {
    StatChanger,
    multiselect
  },
  data () {
    return {
      statOrder: ['c', 's', 'h', 'l', 'p', 'd'],
      addMessage: 'Add Ship',
      veterancies: shipDataFields.veterancies
    }
  },
  methods: {
    commitNewShip () {
      if (this.currentShipName.length * this.currentShipRegistry.length * this.currentShipClass.length) {
        this.$store.dispatch('createNewShip')
        this.addMessage = 'Added'
        setTimeout(() => { this.addMessage = 'Add Ship' }, 1000)
      }
    }
  },
  computed: {
    multiselectOptions () {
      let options = this.operators.map(op => (
        {
          operator: op,
          shipClasses: this.shipClasses[op.toLowerCase()].map(shipClass => shipClass.name)
        }
      ))
      // console.log(options)
      return options
    },
    prefixes () {
      return this.$store.state.shipData.prefixes
    },
    allShipClasses () {
      return [].concat.apply([], Object.values(this.$store.state.shipData.shipClasses))
    },
    shipClasses () {
      return this.$store.state.shipData.shipClasses
    },
    operators () {
      return this.$store.state.shipData.operators
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
        this.$store.commit('updateNewShipField', {field: 'scale', value: this.currentShipClassObject.scale})
        this.$store.commit('updateNewShipField', {field: 'classStats', value: this.statsArray})
        this.$store.commit('updateNewShipField', {field: 'bonusStats', value: [0, 0, 0, 0, 0, 0]})
      }
    },
    statsArray () {
      let sArr = []
      let shipClass = this.currentShipClassObject
      for (let stat of this.statOrder) {
        sArr.push(shipClass[stat])
      }
      return sArr
    },
    currentShipClassStats () {
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
      let classObject = this.allShipClasses.find(el => el.name === this.currentShipClass)
      console.log(classObject)
      if (!classObject) {
        return {
          c: 0,
          s: 0,
          h: 0,
          l: 0,
          p: 0,
          d: 0
        }
      } else {
        return classObject
      }
    }
  }
}
</script>

<style src="../../static/vue-multiselect.css"></style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-ship {
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
