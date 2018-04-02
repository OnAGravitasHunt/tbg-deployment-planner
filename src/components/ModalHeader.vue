<template>
  <div class='modal-header'>
    <div class='modal-corner'>
      <div class='corner-mask'></div>
    </div>
    <div class='modal-title-wrapper'>
      <div class='modal-title-item fill'></div>
      <template v-for="(title, index) of titles" :key="`title-${index}`">
        <div class='modal-title-item'>{{title}}</div>
        <div class='modal-title-item fill'></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHeader',
  props: ['titles']
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-corner {
  vertical-align: top;
  width: 220px;
  height: 80px;
  margin-right: 0;
  background-color: #68c;
  border-top-left-radius: 80px;
  display: inline-block;
}
.corner-mask {
  display: inline-block;
  background-color: #222;
  border-top-left-radius: 60px;
  width: 60px;
  height: 60px;
  margin: 20px 0 0 160px;
}
.modal-title-wrapper {
  vertical-align: top;
  width: 480px;
  height: 100%;
  line-height: 40px;
  display: inline-flex;
  flex-flow: row;
  margin-left: 0;
  margin-bottom: 40px;
  text-transform: uppercase;
  font-size: 16px;
  color: white;
}
.modal-title-item {
  padding: 0 20px;
  background-color: #c66;
  margin-left: 2px;
  display: inline-block;
}
.modal-title-item.fill {
  flex: 2;
  height: 20px;
  background-color: #68c;
  margin-top: 10px;
}
.modal-title-item.fill:first-child {
  flex: 0;
  margin-left: 0;
  height: 20px;
  margin-top: 0;
}
.modal-title-item:last-child {
  margin-right: 20px;
}
</style>
