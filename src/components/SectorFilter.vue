<template>
<div class='sector-filter'>
  <div class='sector-filter-heading'>Filter by:</div>
  <div class='sector-filter-group'>
    <div class='group-title'>Theatre:</div><!--
    --><SectorFilterBox
      v-for="theatre of theatres"
      :key="theatre"
      category='theatre'
      :criterion="theatre">
    </SectorFilterBox>
  </div>
  <div class='sector-filter-group'>
    <div class='group-title'>Type:</div><!--
    --><SectorFilterBox
      v-for="sectorType of sectorTypes"
      :key="sectorType" category='type'
      :criterion="sectorType">
    </SectorFilterBox>
  </div>
  <!--  -->
</div>
</template>

<script>
import SectorFilterBox from './SectorFilterBox'
import sectorDataFields from '../assets/sectorDataFields.json'

export default {
  name: 'SectorFilter',
  components: {
    SectorFilterBox
  },
  data () {
    return {
      theatres: sectorDataFields.theatres,
      sectorTypes: sectorDataFields.sectorTypes
    }
  },
  computed: {},
  methods: {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sector-filter {
  position: fixed;
  background-color: black;
  border-bottom: 2px solid #ccc;
  height: 28px;
  text-align: left;
  padding-left: 20px;
  margin-left: 252px;
  display: flex;
  width: 100%;
}
.sector-filter-heading {
  margin: 2px 0;
}
.sector-filter-group {
  margin: 2px 0;
  display: inline-block;
  /* flex-flow: row wrap; */
  vertical-align: top
}
.group-title {
  color: black;
  background-color: #c90;
  height: 24px;
  margin-left: 5px;
  padding: 0 5px 0 10px;
  border-left: 1px solid black;
  border-radius: 12px 0 0 12px;
  box-sizing: border-box;
  height: 24px;
  line-height: 24px;
  text-align: center;
  display: inline-block;
}

</style>
