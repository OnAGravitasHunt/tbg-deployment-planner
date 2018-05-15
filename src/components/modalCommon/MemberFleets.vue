<template>
  <div class='member-fleets'>
    Here be <s>dragons</s> member ships.
    <table>
      <tr>
        <th v-for="field of schemaFields" :class="field.display" :key="field.key">{{field.name}}</th>
      </tr>
      <tbody v-for="member of members" :key="member.key">
        <tr>
          <th class='across' colspan='3'>{{member.name}}</th>
        </tr>
        <template v-if='memberFleets.hasOwnProperty(member.key)'>
          <tr v-for='ship of Object.values(memberFleets[member.key])' :key="ship.registry">
            <td v-for="field of schemaFields" :class="field.display" :key="field.key">{{ship[field.key]}}</td>
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
        {name: 'Ship', key: 'name', display: 'wide'},
        {name: 'Registry', key: 'registry', display: 'wide'},
        {name: 'Class', key: 'shipClass', display: 'wide'}
      ]
    },
    members () {
      return [
        {name: 'United Earth', key: 'uespa'},
        {name: 'Vulcan', key: 'vulcan'}
      ]
    },
    memberFleets () {
      console.log(this.$store.getters.memberFleets)
      console.log(this.$store.getters.memberFleets.hasOwnProperty('uespa'))
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
td {
  text-align: center;
}
.wide {
  width: 120px;
}
.across {
  border-top: 1px solid white;
}
</style>
