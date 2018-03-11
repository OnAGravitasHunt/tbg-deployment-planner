<template>
<div id='nav-left-wrapper'>
  <h2>Filter Criteria</h2>
  <div id='filter-wrapper-class' class='filter-wrapper'>
    <h3>Filter by Class</h3>
    <FilterBox v-for="shipClass of shipClasses" :key="shipClass" category='class' :criterion="shipClass"></FilterBox>
    <!-- <FilterBox category='class' criterion='Kepler'></FilterBox> -->
  </div>
  <div id='filter-wrapper-scale' class='filter-wrapper'>
    <h3>Filter by Scale</h3>
    <FilterBox v-for="scale of shipScales" :key="scale" category='scale' :criterion="scale"></FilterBox>
    <!-- <FilterBox category='class' criterion='Kepler'></FilterBox> -->
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
      shipScales: ['frigate', 'cruiser', 'explorer']
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
    }
  },
  methods: {
    setFilterCriterion (field, value) {
      this.$store.state.commit('update')
    }
  }
}
</script>

<style scoped>
h2 {
  margin: 10px auto;
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
  overflow-y: hidden;
}
#unassigned-wrapper {
  height: 45%;
  overflow-y: scroll;
}
#available-ships {
  min-height: 200px;
  padding-bottom: 100px;
}
.filter-wrapper {
  /* margin: 10px auto; */
  height: 20%;
  overflow-y: scroll;
}
#filter-wrapper-scale {
  height: 15%;
}
</style>
