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
  data () {
    return {
      filterId: 'filter-' + this.category + '-' + this.criterion
    }
  },
  computed: {
    categoryKey () {
      if (this.category === 'class') {
        return 'shipClass'
      } else {
        return this.category
      }
    },
    filterValue: {
      get () {
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
.filter-selector {
  margin: 1px 2.5px;
  width: 48%;
  /* border: 1px solid black; */
  border-radius: 13px;
  box-sizing: border-box;
  height: 26px;
}
.filter-true {
  background-color: #9c9;
}
.filter-false {
  background-color: #c99;
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
