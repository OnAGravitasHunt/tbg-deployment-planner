<template>
  <div class='modal-header'>
    <div class='modal-corner'>
      <div class='corner-mask'></div>
    </div><!--
    --><div class='modal-heading-wrapper'>
      <div class='modal-heading-fill'></div>
      <div class='modal-heading-item' v-html="heading"></div>
      <div class='modal-heading-fill'></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalHeader',
  props: ['heading'],
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-corner {
  vertical-align: top;
  width: 200px;
  height: 80px;
  background-color: #68c;
  border-top-left-radius: 80px;
  display: inline-block;
}
.corner-mask {
  display: inline-block;
  background-color: #222;
  border-top-left-radius: 40px;
  width: 40px;
  height: 40px;
  margin: 40px 0 0 160px;
}
.modal-heading-wrapper {
  vertical-align: top;
  width: 500px;
  height: 100%;
  line-height: 40px;
  display: inline-flex;
  flex-flow: row;
  margin-bottom: 40px;
  text-transform: uppercase;
  font-size: 25px;
  color: white;
}
.modal-heading-item {
  margin: 0 10px;
  display: inline-block;
}
.modal-heading-fill {
  background-color: #68c;
}
.modal-heading-fill:first-child {
  flex: 2;
  margin-left: 0;
  margin-top: 0;
}
.modal-heading-fill:last-child {
  flex: 0 0 40px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
