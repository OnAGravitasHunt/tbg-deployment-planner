<template>
  <div class='add-sector'>
    <ul class='add-sector-fields'>
      <li>
        <span>Sector Name: </span>
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
        <span>Defence Requirements: </span>
        <input v-model="currentSectorDef" placeholder='Min Defence'>
      </li>
      <li>
        <span>Supporting Sectors: </span>
        <span>(Not yet implemented)</span>
      </li>
    </ul>
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
    commitNewSector () {
      if (!this.currentSectorDef) {
        this.currentSectorDef = '0'
      }
      this.$store.dispatch('createNewSector')
      this.$store.commit('setModal', 'none')
    }
  },
  computed: {
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
        return this.$store.state.sectorEditing.selectedSector.defence
      },
      set (defence) {
        this.$store.commit('updateSelectedSectorField', {field: 'defence', value: defence})
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
.add-sector-fields {
  list-style-type:none;
  padding-left: 10px;
}
li {
  margin: 10px 0px;
}
input, select {
  float: right;
}
select option {
  text-transform: capitalize;
}
</style>
