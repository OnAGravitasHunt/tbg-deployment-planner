<template>
  <div class='modal-content'>
    <div class='modal-header'>
      <div class='lcars-bar lcars-bar-left'></div>
      <div class='lcars-bar lcars-bar-main'>Add New Sector</div>
      <div class='lcars-bar lcars-bar-right'></div>
    </div>
    <!--  -->
    <div class='modal-body'>
      <ul class='add-sector-fields'>
        <li>
          <input v-model="currentSectorName" placeholder='Sector name'>
        </li>
        <li>
          <span>Sector Type: </span>
          <select v-model="currentSectorType">
            <option disabled value="">Select Sector Type</option>
            <option v-for="type of sectorTypes" :key="type">{{type}}</option>
          </select>
        </li>
        <li>
          <span>Theatre: </span>
          <select v-model="currentSectorTheatre">
            <option disabled value="">Select Theatre</option>
            <option v-for="theatre of theatres" :key="theatre">{{theatre}}</option>
          </select>
        </li>
        <li>
          <span>Defense Requirements: </span>
          <input v-model="currentSectorDef" placeholder='Min Defense'>
        </li>
        <li>
          <span>Supporting Sectors: </span>
          <span>(Not yet implemented)</span>
        </li>
      </ul>
    </div>
    <!--  -->
    <div class='modal-footer'>
      <button class='modal-default-button' @click="showAddSectorModal = false">Close</button>
      <button class='modal-default-button' @click="commitChanges">{{saveMessage}}</button>
    </div>
  </div>
</template>

<script>
import sectorDataFields from '../assets/sectorDataFields.json'

export default {
  name: 'AddSector',
  components: {},
  data () {
    return {
      saveMessage: 'Save',
      theatres: sectorDataFields.theatres,
      sectorTypes: sectorDataFields.sectorTypes
    }
  },
  methods: {
    commitChanges () {
      this.$store.dispatch('createNewSector')
      this.showAddSectorModal = false
    }
  },
  computed: {
    showAddSectorModal: {
      get () {
        return this.$store.state.modalBools.showAddSector
      },
      set (value) {
        this.$store.commit('updateShowAddSector', value)
      }
    },
    currentSectorName: {
      get () {
        return this.$store.state.sectorEditing.selectedSector.name
      },
      set (sectorName) {
        this.$store.commit('updateSelectedSectorField', {field: 'name', value: sectorName})
      }
    },
    currentSectorType: {
      get () {
        return this.$store.state.sectorEditing.selectedSector.type
      },
      set (sectorType) {
        this.$store.commit('updateSelectedSectorField', {field: 'type', value: sectorType})
      }
    },
    currentSectorTheatre: {
      get () {
        return this.$store.state.sectorEditing.selectedSector.theatre
      },
      set (theatreName) {
        this.$store.commit('updateSelectedSectorField', {field: 'theatre', value: theatreName})
      }
    },
    currentSectorDef: {
      get () {
        return this.$store.state.sectorEditing.selectedSector.defense
      },
      set (defense) {
        this.$store.commit('updateSelectedSectorField', {field: 'defense', value: defense})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.add-sector-fields {
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
select option {
  text-transform: capitalize;
}
input {
  /* width: 50px; */
}
.registry-input {
  width: 60px;
}
</style>
