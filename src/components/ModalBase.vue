<template>
<transition name='modal'>
  <div class='modal-mask'>
    <div class='modal-wrapper'>
      <div class='modal-container'>
        <!-- <AddSector></AddSector> -->
        <AddShip></AddShip>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
// import sectorDataFields from '../assets/sectorDataFields.json'
import AddSector from './AddSector'
import AddShip from './AddShip'

export default {
  name: 'ModalBase',
  components: {
    AddSector,
    AddShip
  },
  computed: {
    showAddSectorModal: {
      get () {
        return this.store.state.modalBools.showAddSector
      },
      set (value) {
        this.store.commit('updateShowAddSector')
      }
    },
    showAddSectorShip: {
      get () {
        return this.store.state.modalBools.showAddShip
      },
      set (value) {
        this.store.commit('updateShowAddShip')
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
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  /* height: 400px; */
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #222;
  color: white;
  border: 2px solid white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

li {
  margin: 10px 0px;
}

.lcars-bar {
  height: 40px;
  background-color:  #55f;
  margin: 0px;
  display: inline-block;
  vertical-align: top;
}

.lcars-bar-left {
  width: 30px;
  border-radius: 20px 0px 0px 20px;
}

.lcars-bar-main {
  width: 400px;
  font-size: 20px;
  color: #ccc;
  border-radius: 0;
  padding: 0px 10px;
  line-height: 40px;
  text-transform: uppercase;
}

.lcars-bar-right {
  width: 30px;
  border-radius: 0px 20px 20px 0px;
}
</style>
