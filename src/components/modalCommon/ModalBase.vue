<template>
<transition name='modal'>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class='modal-container'>
        <ModalHeader :heading="header"></ModalHeader>
        <div class='modal-body'>
          <ModalMenu :menuItems="menuItems" :menuType="menuType"></ModalMenu>
          <AddShip v-show="currentModal === 'add-ship'"></AddShip>
          <AddSector v-show="currentModal === 'add-sector'"></AddSector>
          <ShipInfo v-show="currentModal === 'ship-info'"></ShipInfo>
          <AddShipClass v-show="currentModal === 'add-ship-class'"></AddShipClass>
          <EditShip v-show="currentModal === 'ship-edit'"></EditShip>
          <EditSector v-show="currentModal === 'sector-edit'"></EditSector>
          <ModalList v-show="currentModal === 'modal-list'"></ModalList>
        </div>
        <ModalFooter footer=''></ModalFooter>
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
import AddShipClass from './AddShipClass'
import AddSector from './AddSector'
import EditSector from './EditSector'
import ModalList from './modalList/ModalList.vue'

export default {
  name: 'ModalBase',
  components: {
    ModalHeader,
    ModalFooter,
    ModalMenu,
    AddShip,
    EditShip,
    ShipInfo,
    AddShipClass,
    AddSector,
    EditSector,
    ModalList
  },
  data () {
    return {
      addMenu: [
        {label: 'New Ship', modalType: 'normal', modal: 'add-ship'},
        {label: 'New Sector', modalType: 'normal', modal: 'add-sector'},
        {label: 'New Ship Options', modalType: 'normal', modal: 'add-ship-class'},
        {label: 'Edit Ship Classes', modalType: 'list', modal: 'shipClasses'},
        {label: 'Edit Prefixes', modalType: 'list', modal: 'prefixes'}
      ],
      shipMenu: [
        {label: 'Ship Info', modal: 'ship-info'},
        {label: 'Edit Starship', modal: 'ship-edit'}
      ],
      sectorMenu: [
        {label: 'Edit Sector', modal: 'sector-edit'}
      ]
    }
  },
  computed: {
    // Current Modal
    currentModal () {
      return this.$store.state.currentModal
    },
    // Modal Menu
    menuItems () {
      switch (this.currentModal) {
        case 'add-ship':
        case 'add-sector':
        case 'add-ship-class':
        case 'modal-list':
          return this.addMenu
        case 'ship-info':
        case 'ship-edit':
          return this.shipMenu
        case 'sector-edit':
          return this.sectorMenu
        default:
          return []
      }
    },
    menuType () {
      if (this.currentModal === 'modal-list') {
        return 'list'
      } else {
        return 'normal'
      }
    },
    header () {
      switch (this.currentModal) {
        case 'add-ship':
          return 'Add New Starship'
        case 'add-sector':
          return 'Add New Sector'
        case 'ship-info':
        case 'ship-edit':
          return this.shipHeader
        case 'add-ship-class':
          return 'Add New Starship Options'
        case 'sector-edit':
          return 'Edit Sector'
        case 'modal-list':
          return this.listHeader
        default:
          return ''
      }
    },
    // List headers
    listHeader () {
      if (this.$store.state.shipData.currentSchema === 'shipClasses') {
        return 'Editing Ship Classes'
      } else if (this.$store.state.shipData.currentSchema === 'prefixes') {
        return 'Editing Prefixes'
      }
    },
    // Ship Info Title
    shipHeader () {
      let curr = this.$store.getters.shipObjects[this.$store.state.shipEditing.shipRegistry]
      let prefix = curr.prefix === 'No prefix' ? '' : `${curr.prefix} `
      let regPrefix = this.$store.state.shipEditing.newShip.scale === 'station' ? '' : 'NCC-'
      return `${prefix}${curr.name} &#xb7; ${regPrefix}${curr.registry}`
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
  /* padding: 5px; */
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
  /* min-height: 300px; */
  height: 400px;
}
</style>
