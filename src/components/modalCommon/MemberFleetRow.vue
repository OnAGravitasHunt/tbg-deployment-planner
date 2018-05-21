<template>
  <tr class='ship-row'>
    <td class="ship-name wide">{{ship.prefix}} <em>{{ship.name}}</em></td>
    <td class="wide">NCC-{{ship.registry}}</td>
    <td class="wide">{{ship.shipClass}}</td>
    <td class="narrow"><input type='checkbox' :value="ship.registry" v-model="shipRequested"></td>
  </tr>
</template>

<script>
export default {
  name: 'MemberFleets',
  components: {},
  props: ['ship', 'member'],
  data () {
    return {}
  },
  methods: {},
  computed: {
    shipRequested: {
      get () {
        return this.$store.getters.requestedMemberShips
      },
      set (value) {
        this.$store.commit('updateRequestedMemberShips', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.member-fleets {
  margin: 35px 0;
  margin-left: 10px;
  display: inline-block;
  vertical-align: top;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
.table-header {
  margin-bottom: 8px;
}
td {
  padding: 2px 0;
  text-align: center;
  border-left: 1px solid white;
  border-right: 1px solid white;
}
.ship-row {
  border-top: 1px solid white;
}
.wide {
  width: 120px;
}
.narrow {
  width: 60px;
}
.across {
  border: 1px solid white;
  border-top: 2px solid white;
}
</style>
