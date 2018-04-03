<template>
<transition name='modal'>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class='modal-container'>
        <ModalHeader :heading="shipHeader"></ModalHeader>
        <div class='modal-body'>
          <ModalMenu :menuItems="menuItems"></ModalMenu>
          <!-- <AddShip v-show="showAddShipModal"></AddShip> -->
          <!-- <EditShip v-show="showEditShipModal"></EditShip> -->
          <ShipInfo v-show="currentModal === 'showShipInfo'"></ShipInfo>
          <!-- <AddSector v-show="showAddSectorModal"></AddSector> -->
          <!-- <EditSector v-show="showEditSectorModal"></EditSector> -->
        </div>
        <ModalFooter heading='USS Avandar &#xb7; NCC-2010'></ModalFooter>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
// import sectorDataFields from '../assets/sectorDataFields.json'
import ModalHeader from './ModalHeader'
import ModalFooter from './ModalFooter'
import ModalMenu from './ModalMenu'
import AddShip from './AddShip'
import EditShip from './EditShip'
import ShipInfo from './ShipInfo'
import AddSector from './AddSector'
import EditSector from './EditSector'

export default {
  name: 'ModalBase',
  components: {
    ModalHeader,
    ModalFooter,
    ModalMenu,
    AddShip,
    EditShip,
    ShipInfo,
    AddSector,
    EditSector
  },
  computed: {
    // Current Modal
    currentModal () {
      return this.$store.state.currentModal
      // let filt = Object.keys(this.$store.state.modalBools).filter(key => this.$store.state.modalBools[key])
      // return filt.length ? filt[0] : 'none'
      // return filt
    },
    // Modal Menu
    menuItems () {
      switch (this.currentModal) {
        case 'showAddShip':
        case 'showAddSector':
          return ['Add Ship', 'Add Sector']
        case 'showShipInfo':
        case 'showEditShip':
          return ['Ship Info', 'Edit Ship']
        default:
          return []
      }
    },
    // Ship Info Title
    shipHeader () {
      let curr = this.$store.state.shipEditing.newShip
      return `${curr.prefix} ${curr.name} &#xb7; NCC-${curr.registry}`
    },
    // Modals show/hide
    // Add Ship/Sector/(ShipClass)
    showAddShipModal: {
      get () {
        return this.$store.state.modalBools.showAddShip
      },
      set (value) {
        this.$store.commit('updateShowAddShip', value)
      }
    },
    showAddSectorModal: {
      get () {
        return this.$store.state.modalBools.showAddSector
      },
      set (value) {
        this.$store.commit('updateShowAddSector', value)
      }
    },
    // Ship Info/Edit
    showShipInfoModal: {
      get () {
        return this.$store.state.modalBools.showShipInfo
      },
      set (value) {
        this.$store.commit('updateShowShipInfo', value)
      }
    },
    showEditShipModal: {
      get () {
        return this.$store.state.modalBools.showEditShip
      },
      set (value) {
        this.$store.commit('updateShowEditShip', value)
      }
    },
    // Sector (Info)/Edit
    showEditSectorModal: {
      get () {
        return this.$store.state.modalBools.showEditSector
      },
      set (value) {
        this.$store.commit('updateShowEditSector', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .8);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 700px;
  margin: 0px auto;
  padding: 5px;
  background-color: #222;
  color: white;
  /* border: 1px solid white; */
  border-top-left-radius: 80px;
  border-bottom-left-radius: 80px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
  display: flex;
}
</style>
