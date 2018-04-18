<template>
<div id='nav-left-wrapper'>
  <h3>Filter Criteria</h3>
  <div id='filter-heading-wrapper'>
    <label class='filter-heading' for='show-class-filter'>
      <input type='checkbox' id='show-class-filter' v-model="classFilterShow">Filter by Class
    </label>
    <label class='filter-heading' for='show-scale-filter'>
      <input type='checkbox' id='show-scale-filter' v-model="scaleFilterShow">Filter by Scale
    </label><!--
  --></div><!--
  --><div id='filter-wrapper-class' v-show="classFilterShow" class='filter-wrapper'><!--
    --><div class='button' @click="selectAllClasses">Select {{classAll}}</div><!--
    --><FilterBox
      v-for="shipClass of shipClasses"
      :key="shipClass"
      category='class'
      :criterion="shipClass"
    ></FilterBox><!--
  --></div><!--
  --><div id='filter-wrapper-scale' v-show="scaleFilterShow" class='filter-wrapper'><!--
    --><div class='button' @click="selectAllScales">Select {{scaleAll}}</div><!--
    --><FilterBox
      v-for="scale of shipScales"
      :key="scale"
      category='scale'
      :criterion="scale"
    ></FilterBox><!--
  --></div>
  <h3>Available Starships</h3>
  <div id='unassigned-wrapper'>
    <draggable id='available-ships' v-model="availableShips" :options="{group:'ships'}">
      <Ship v-for="shipReg of availableShips" :key="shipReg" :registry="shipReg"></Ship>
    </draggable>
  </div>
</div>
</template>

<script>
import Ship from './Ship'
import FilterBox from './FilterBox'
import draggable from 'vuedraggable'

export default {
  name: 'Unassigned',
  components: {
    Ship,
    FilterBox,
    draggable
  },
  data () {
    return {
      shipScales: ['frigate', 'cruiser', 'explorer'],
      classFilterShow: false,
      scaleFilterShow: false,
      classAllSelected: true,
      scaleAllSelected: true
    }
  },
  computed: {
    shipClasses () {
      return this.$store.state.shipData.shipClasses.map((el) => el.name)
    },
    availableShips: {
      get () {
        return this.$store.getters.unassignedShips
      },
      set (value) {
        this.$store.commit('updateAvail', value)
      }
    },
    shipObjects () {
      return this.$store.getters.shipObjects
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
h3 {
  margin: 10px auto 0px;
}
h3:first-child {
  margin-top: 0;
}
#nav-left-wrapper {
  width: 250px;
  border-right: 2px solid #ccc;
  height: 100%;
  position: fixed;
  float: left;
  background-color: #ccc;
  /* margin-top: 50px; */
  padding-top: 10px;
  display: flex;
  flex-flow: column;
}
#unassigned-wrapper {
  width: 100%;
  overflow-y: scroll;
  flex-shrink: 1;
  margin-bottom: 50px;
}
/* scrollbar */
#unassigned-wrapper::-webkit-scrollbar {
    width: 10px;
}
#unassigned-wrapper::-webkit-scrollbar-track {
  width: 8px;
  border-radius: 4px;
}
#unassigned-wrapper::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
#unassigned-wrapper::-webkit-scrollbar-thumb:hover {
  background: #444;
}
#available-ships {
  min-height: 200px;
  padding-bottom: 100px;
}
.filter-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  flex-shrink: 0;
}
.button {
  height: 22px;
  font-size: 14px;
  width: 100%;
  margin: 2px;
  border-radius: 11px;
  background-color: #c90;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#filter-heading-wrapper {
  display: flex;
  flex-flow: row nowrap;
  /* height: 25px; */
  margin-bottom: 15px;
}
.filter-heading {
  max-width: 50%;
  height: 22px;
  line-height: 22px;
  border-right: 1px solid #669;
  background-color: #99c;
  margin-top: 5px;
  font-size: 15px;
  font-weight: bold;
  width: 100%;
  padding: 0;
  flex: 1;
}
.filter-heading:first-child {
  margin-left: 2px;
  border-top-left-radius: 11px;
  border-bottom-left-radius: 11px;
}
.filter-heading:last-child {
  margin-right: 2px;
  border-right: none;
  border-top-right-radius: 11px;
  border-bottom-right-radius: 11px;
}
input {
  margin: 0;
  visibility: collapse;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
}
</style>
