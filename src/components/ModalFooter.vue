<template>
  <div class='modal-header'>
    <div class='modal-corner'>
      <div class='corner-mask'></div>
    </div><!--
    --><div class='modal-footer-wrapper'>
      <div class='modal-footer-fill'></div>
      <div class='button modal-footer-item green' @click="save">{{saveMessage}}</div>
      <div class='modal-footer-fill'></div>
      <div class='button modal-footer-item red' @click="close">Close</div>
      <div class='modal-footer-fill'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHeader',
  props: ['footer'],
  data () {
    return {
      saveMessage: 'Save'
    }
  },
  computed: {
    currentModal () {
      return this.$store.state.currentModal
    },
    currentSectorDef: {
      get () {
        return this.$store.state.sectorEditing.selectedSector.defense
      },
      set (defense) {
        this.$store.commit('updateSelectedSectorField', {field: 'defense', value: defense})
      }
    }
  },
  methods: {
    save () {
      let dispatchString = ''
      switch (this.currentModal) {
        case 'add-ship':
          dispatchString = 'createNewShip'
          break
        case 'add-sector':
          if (!this.currentSectorDef) {
            this.currentSectorDef = 0
          }
          dispatchString = 'createNewSector'
          break
        case 'ship-edit':
          dispatchString = 'commitShipChanges'
          break
        case 'sector-edit':
          dispatchString = 'commitSectorChanges'
          break
        default:
          return
      }
      this.$store.dispatch(dispatchString)
      this.saveMessage = 'Saved'
      setTimeout(() => { this.saveMessage = 'Save' }, 1000)
    },
    close () {
      this.$store.commit('setAllModalsHidden')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.blue {
  background-color: #68c;
}
.green {
  background-color: #4a3;
}
.red {
  background-color: #c68;
}
.modal-corner {
  vertical-align: bottom;
  width: 200px;
  height: 80px;
  background-color: #68c;
  border-bottom-left-radius: 80px;
  display: inline-block;
}
.corner-mask {
  display: inline-block;
  background-color: #222;
  border-bottom-left-radius: 40px;
  width: 40px;
  height: 40px;
  margin: 0 0 40px 160px;
}
.modal-footer-wrapper {
  vertical-align: bottom;
  width: 500px;
  height: 100%;
  line-height: 40px;
  display: inline-flex;
  flex-flow: row;
  text-transform: uppercase;
  font-size: 20px;
  color: white;
}
.modal-footer-item {
  margin: 0 10px;
  display: inline-block;
}
.modal-footer-fill {
  flex: 2;
  background-color: #68c;
  margin: 0 2px;
}
.modal-footer-fill:first-child {
  flex: 4;
  margin-left: 0;
}
.modal-footer-fill:last-child {
  flex: 0 0 40px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.button {
  /* background-color: #c68; */
  padding: 0 10px;
  margin: 0 2px;
}
.button:first-child {
  margin: 0;
}
</style>
