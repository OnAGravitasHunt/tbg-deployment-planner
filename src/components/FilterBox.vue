<template>
<div :class="`filter-selector filter-${filterValue}`">
  <!-- <input type='checkbox' :id="filterId" :value="criterion" v-model="filterValue"> -->
  <label :for="filterId"><input type='checkbox' :id="filterId" :value="criterion" v-model="filterValue">{{criterion}}</label>
</div>
</template>

<script>

export default {
  name: 'FilterBox',
  props: ['category', 'criterion'],
  computed: {
    filterID () {
      return 'filter-' + this.category + '-' + this.criterion
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
        return this.$store.state.filtering.filterCategories[this.categoryKey][this.criterion]
      },
      set (value) {
        this.$store.commit('updateFilter', {category: this.categoryKey, criterion: this.criterion, value: value})
      }
    }
  }
}
</script>

<style scoped>
.filter-selector {
  margin: 1px 2.5px;
  width: 48%;
  border-radius: 12px;
  box-sizing: border-box;
  height: 24px;
}
.filter-true {
  border: 1px solid #474;
  background-color: #7d7;
  color: black;
}
.filter-false {
  background-color: #999;
  color: white;
}
label {
  text-transform: capitalize;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  width: 100%;
  margin: 0;
  /* height: 100%; */
}
input {
  margin: 0;
  visibility: collapse;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
}
</style>
