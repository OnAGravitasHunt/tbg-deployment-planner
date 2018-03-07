<template>
<transition name='modal'>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <!--  -->
        <div class="modal-header">
          <slot name="header">
            <h3>Add New Ship</h3>
          </slot>
        </div>
        <!--  -->
        <div class="modal-body">
          <ul style="list-style-type:none;">
            <li>
              <!-- <span>Name: </span> -->
              <select v-model="selectedPrefix">
                <option v-for="prefix of prefixes" :key="prefix">{{prefix}}</option>
              </select>
              <input v-model="name" placeholder='Ship name'>
            </li>
            <li>
              <span>Ship Class: </span>
              <select v-model="selectedClass">
                <option v-for="shipClass of shipClasses" :key="shipClass.name">{{shipClass.name}}</option>
              </select>
            </li>
          </ul>
        </div>
        <!--  -->
        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button" @click="showAddShipModal = false">Cancel</button>
            <button class="modal-default-button" @click="showAddShipModal = false">Add Ship</button>
          </slot>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import shipDataFields from '../assets/shipDataFields.json'

export default {
  name: 'AddShip',
  data () {
    return {
      prefixes: shipDataFields.prefixes,
      selectedPrefix: 'USS',
      name: '',
      shipClasses: shipDataFields.shipClasses,
      selectedClass: 'Ambassador',
      veterancies: shipDataFields.veterancies
    }
  },
  computed: {
    showAddShipModal: {
      get () {
        return this.$store.state.addShipShow
      },
      set (value) {
        this.$store.commit('updateShowAddShip', value)
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
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  /* float: right; */
}
</style>
