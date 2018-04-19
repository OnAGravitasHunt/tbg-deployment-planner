<template>
<div :class="`sector-filter-selector filter-${filterValue}`">
  <label :for="filterId"><input type='checkbox' :id="filterId" :value="criterion" v-model="filterValue">{{criterion}}</label>
</div>
</template>

<script>
export default {
  name: 'SectorFilterBox',
  props: ['category', 'criterion'],
  computed: {
    filterId () {
      return 'sector-filter-' + this.category + '-' + this.criterionKey
    },
    criterionKey () {
      switch (this.criterion) {
        case 'None/Other':
          return 'other'
        case 'Task Force':
          return 'taskforce'
        case 'Theatre':
          return 'theatrefleet'
        default:
          return this.criterion.toLowerCase()
      }
    },
    filterValue: {
      get () {
        return this.$store.state.sectorFiltering.filterCategories[this.category][this.criterionKey]
      },
      set (value) {
        this.$store.commit('updateSectorFilter', {category: this.category, criterion: this.criterionKey, value: value})
      }
    }
  }
}
</script>

<style scoped>
.sector-filter-selector {
  /* margin: 0; */
  padding: 0 5px;
  border-left: 1px solid black;
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
  text-align: center;
  display: inline-block;
}
.sector-filter-selector:first-child {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.sector-filter-selector:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  padding-right: 10px;
}
label {
  text-transform: capitalize;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  /* color: black; */
  width: 100%;
  margin: 0;
}
.filter-true {
  background-color: #7d7f;
  color: black;
}
.filter-false {
  /* background-color: #c99; */
  background-color: #666f;
  color: white;
}
input {
  margin: 0;
  display: none;
  visibility: collapse;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
}
</style>
