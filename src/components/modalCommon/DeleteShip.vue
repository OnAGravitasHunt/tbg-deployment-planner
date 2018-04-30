<template>
  <div class='delete-ship'>
    <div
      class='button delete-button'
      @click="deleteShip"
    >Delete <span v-html="shipDisplay"></span></div>
  </div>
</template>

<script>
export default {
  name: 'DeleteShip',
  components: {},
  data () {
    return {}
  },
  methods: {
    deleteShip () {
      this.$store.commit('setModal', 'none')
      this.$store.commit('deleteShip', this.currentShip.registry)
    }
  },
  computed: {
    currentShip () {
      let ship = this.$store.getters.shipObjects[this.$store.state.shipEditing.shipRegistry]
      if (ship) {
        return ship
      } else {
        return {
          registry: '',
          name: '',
          shipClass: '',
          prefix: 'USS',
          scale: '',
          classStats: [0, 0, 0, 0, 0, 0],
          veterancy: 0,
          bonusStats: [0, 0, 0, 0, 0, 0],
          mobile: true,
          captain: ''
        }
      }
    },
    prefixDisplay () {
      return this.currentShip.prefix === 'No prefix' ? '' : `${this.currentShip.prefix} `
    },
    shipName () {
      return this.currentShip.scale === 'station' ? this.currentShip.name : `<em>${this.currentShip.name}</em>`
    },
    shipDisplay () {
      return `${this.prefixDisplay} ${this.shipName}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.delete-ship {
  width: 100%;
  padding: 25px;
}
.button {
  border-radius: 20px;
  width: 300px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #c34;
  padding: 0 20px;
  margin: 0 2px;
}
</style>
