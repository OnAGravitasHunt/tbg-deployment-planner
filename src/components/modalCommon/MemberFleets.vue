<template>
  <div class='member-fleets'>
    Here be <s>dragons</s> member ships.
    <table>
      <tr>
        <th v-for="field of schemaFields" class='table-header' :class="field.display" :key="field.key">{{field.name}}</th>
      </tr>
      <tbody v-for="member of members" :key="member.key">
        <tr>
          <th class='across' colspan='4'>{{member.name}}</th>
        </tr>
        <template v-if='memberFleets.hasOwnProperty(member.key)'>
          <tr class='ship-row' v-for='ship of Object.values(memberFleets[member.key])' :key="ship.registry">
            <!-- <td
              v-for="field of schemaFields"
              :class="field.display"
              :key="field.key"
            >{{field.cellPrefix}}{{ship[field.key]}}</td> -->
            <td class="ship-name wide">{{ship.prefix}} <em>{{ship.name}}</em></td>
            <td class="wide">NCC-{{ship.registry}}</td>
            <td class="wide">{{ship.shipClass}}</td>
            <td class="narrow"><input type='checkbox'></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MemberFleets',
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {
    schemaFields () {
      return [
        {name: 'Ship Name', key: 'name', display: 'wide ship-name'},
        {name: 'Registry', key: 'registry', display: 'wide'},
        {name: 'Class', key: 'shipClass', display: 'wide'},
        {name: 'Req', key: '', display: 'narrow'}
      ]
    },
    members () {
      return [
        {name: 'United Earth', key: 'uespa'},
        {name: 'Vulcan', key: 'vulcan'}
      ]
    },
    memberFleets () {
      return this.$store.getters.memberFleets
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
