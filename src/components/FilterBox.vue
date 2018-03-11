<template>
<div id="filter-selector">
  <input type='checkbox' :id="filterId" :value="criterion" v-model="filterValue">
  <label :for="filterId">{{criterion}}</label>
</div>
</template>

<script>

export default {
  name: 'FilterBox',
  props: ['category', 'criterion'],
  data () {
    return {
      filterId: 'filter-' + this.category + '-' + this.criterion
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
    categoryKey () {
      if (this.category === 'class') {
        return 'shipClass'
      } else {
        return this.category
      }
    },
    filterValue: {
      get () {
        // console.log(this.$store.state.)
        return this.$store.state.filterCategories[this.categoryKey][this.criterion]
      },
      set (value) {
        this.$store.commit('updateFilter', {category: this.categoryKey, criterion: this.criterion, value: value})
      }
    }
  }
}
</script>

<style scoped>
label {
  text-transform: capitalize;
}
</style>
