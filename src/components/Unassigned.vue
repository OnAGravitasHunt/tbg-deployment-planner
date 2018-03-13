<template>
<div id='nav-left-wrapper'>
  <h2>Filter Criteria</h2>

  <!-- <h3>Filter by Class</h3> -->
  <label for='show-class-filter'><input type='checkbox' id='show-class-filter' v-model="classFilterShow">Filter by Class</label>
  <div id='filter-wrapper-class' :class="`filter-wrapper filter-show-${classFilterShow}`">
    <button class='allnone' @click="selectAllClasses">Select {{classAll}}</button>
    <FilterBox v-for="shipClass of shipClasses" :key="shipClass" category='class' :criterion="shipClass"></FilterBox>
  </div>

  <!-- <h3>Filter by Scale</h3> -->
  <label for='show-scale-filter'><input type='checkbox' id='show-scale-filter' v-model="scaleFilterShow">Filter by Scale</label>
  <div id='filter-wrapper-scale' :class="`filter-wrapper filter-show-${scaleFilterShow}`">
    <button class='allnone' @click="selectAllScales">Select {{scaleAll}}</button>
    <FilterBox v-for="scale of shipScales" :key="scale" category='scale' :criterion="scale"></FilterBox>
  </div>

  <h2>Available Starships</h2>
  <div id='unassigned-wrapper'>
    <draggable id='available-ships' v-model="availableShips" :options="{group:'ships'}">
      <Ship v-for="ship of availableShips" :key="ship.registry" v-bind="ship"></Ship>
    </draggable>
  </div>
</div>
</template>

<script>
import Ship from './Ship'
import FilterBox from './FilterBox'
import draggable from 'vuedraggable'
import shipDataFields from '../assets/shipDataFields.json'

export default {
  name: 'Unassigned',
  components: {
    Ship,
    FilterBox,
    draggable
  },
  data () {
    return {
      shipClasses: shipDataFields.shipClasses.map((el) => el.name),
      shipScales: ['frigate', 'cruiser', 'explorer'],
      classFilterShow: false,
      scaleFilterShow: false,
      classAllSelected: true,
      scaleAllSelected: true
    }
  },
  computed: {
    availableShips: {
      get () {
        return this.$store.state.deployment.ships
      },
      set (value) {
        this.$store.commit('updateAvail', value)
      }
    },
    classAll () {
      return this.classAllSelected ? 'none' : 'all'
    },
    scaleAll () {
      return this.scaleAllSelected ? 'none' : 'all'
    }
  },
  methods: {
    selectAllClasses () {
      this.classAllSelected = !this.classAllSelected
      this.$store.commit('updateFilterAll', {category: 'shipClass', value: this.classAllSelected})
    },
    selectAllScales () {
      this.scaleAllSelected = !this.scaleAllSelected
      this.$store.commit('updateFilterAll', {category: 'scale', value: this.scaleAllSelected})
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 10px auto;
  flex-shrink: 0;
}
h3 {
  margin: 0 auto 10px auto;
}
#nav-left-wrapper {
  width: 250px;
  border-right: 2px solid black;
  height: 100%;
  position: fixed;
  float: left;
  background-color: #ccc;
  margin-top: 50px;
  /* overflow-y: scroll; */
  display: flex;
  flex-flow: column;
}
#unassigned-wrapper {
  width: 100%;
  overflow-y: scroll;
  flex-shrink: 1;
}
#available-ships {
  min-height: 200px;
  padding-bottom: 100px;
}
.filter-wrapper {
  /* height: 210px; */
  width: 100%;
  overflow-y: scroll;
  display: flex;
  flex-flow: row wrap;
  flex-shrink: 0;
}
#filter-wrapper-scale.filter-show-true {
  /* height: 60px; */
}
.filter-show-false {
  visibility: collapse;
  height: 10px;
}
.allnone {
  height: 22px;
  font-size: 14px;
  width: 100%;
  margin: 2px;
  padding: 0;
  border-radius: 11px;
  border: none;
  outline: none;
  background-color: #c90;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
label {
  font-size: 19px;
  font-weight: bold;
  width: 100%;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
}
input {
  margin: 0;
  visibility: collapse;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
}
</style>
