<template>
  <div class='edit-sector'>
    <ul class='add-sector-fields'>
      <li>
        <span>Name: </span>
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
        <span class='not-imp'>(Not yet implemented)</span>
      </li>
      <li>
        <div
          class='button delete-button'
          @click="deleteSector"
        >Delete Sector</div>
      </li>
      <li>
        <p>{{statusMessage}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import sectorDataFields from '../../assets/sectorDataFields.json'

export default {
  name: 'EditSector',
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
      if (this.sectorsObj.hasOwnProperty(this.currentSectorName) && this.currentSectorName !== this.oldName) {
        this.abortChange()
      } else {
        this.$store.dispatch('commitSectorChanges')
        this.$store.commit('setModal', 'none')
      }
    },
    deleteSector () {
      this.$store.commit('setModal', 'none')
      this.$store.dispatch('removeSector')
    },
    abortChange () {
      this.statusMessage = 'Error: There is already a sector with that name.'
    }
  },
  computed: {
    statusMessage () {
      return this.$store.state.sectorEditing.statusMessage
    },
    sectorsObj () {
      return this.$store.getters.sectors
    },
    oldName () {
      return this.$store.state.sectorEditing.selectedSectorName
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
        return this.$store.state.sectorEditing.selectedSector.defence
      },
      set (defence) {
        this.$store.commit('updateSelectedSectorField', {field: 'defence', value: Number(defence)})
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit-sector {
  margin: 0 20px 0 20px;
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
input, select, .not-imp {
  float: right;
  margin-left: 40px;
}
select option {
  text-transform: capitalize;
}
li:last-child {
  margin-top: 80px;
}
.button {
  border-radius: 20px;
  /* width: 100px; */
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #c34;
  padding: 0 10px;
  margin: 0 2px;
}
</style>
