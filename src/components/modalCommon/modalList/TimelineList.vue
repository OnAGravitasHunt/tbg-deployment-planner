<template>
  <div class='modal-list'>
    <div id='timeline-table'>
      <table>
        <tr>
          <th v-for="field of schemaFields" :key="field.name">{{field.name}}</th>
        </tr>
        <draggable
          class='table-drag'
          v-model="dataPoints"
          element='tbody'
          :options="{group: 'timeline'}"
        >
          <TimelineRow
            v-for="(entry, index) of dataPoints"
            :key="`${entry.dateLabel}-${index}`"
            :entry="entry"
            :rowIndex="index"
          ></TimelineRow>
        </draggable>
      </table>
    </div>
    <div class='message'>
      Currently copied tick: {{displayCopiedTick}}
    </div>
    <div
      class='button'
      :class="[buttonColor]"
      title='BBCode' @click="bbcode"
    >{{message}}</div>
    <BBCode ref='bbcode-button'></BBCode>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import TimelineRow from './TimelineRow'
import BBCode from '../../bbcode/BBCode.vue'

export default {
  name: 'TimelineList',
  components: {
    TimelineRow,
    BBCode,
    draggable
  },
  data () {
    return {
      message: 'Export selected as BBCode',
      buttonColor: 'blue'
    }
  },
  methods: {
    bbcode () {
      this.$refs['bbcode-button'].copyToClipboard().then(() => {
        this.setBBCodeMessage('Copied to clipboard!', 'green')
      }).catch((e) => {
        this.setBBCodeMessage(e.message, 'red')
      })
    },
    setBBCodeMessage (message, color) {
      this.message = message
      this.buttonColor = color
      setTimeout(() => {
        this.message = 'Export selected as BBCode'
        this.buttonColor = 'blue'
      }, 2000)
    }
  },
  computed: {
    schemaFields () {
      return [
        {name: 'Name', key: 'tick', type: 'text', display: 'wide'},
        {name: 'Copy', key: 'copy', type: 'button', display: 'narrow'},
        {name: 'Paste', key: 'paste', type: 'button', display: 'narrow'},
        {name: 'Export?', key: 'tick', type: 'check', display: 'narrow'}
      ]
    },
    dataPoints: {
      get () {
        return this.$store.state.deployment.timeline
      },
      set (value) {
        this.$store.commit('rearrangeTimeline', value)
      }
    },
    operators () {
      return this.$store.state.shipData.operators
    },
    displayCopiedTick () {
      if (this.$store.state.deployment.copiedTick === null) {
        return 'None'
      } else {
        return this.$store.state.deployment.copiedTick.dateLabel
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.modal-list {
  margin-left: 20px;
  padding-right: 15px;
  max-height: 400px;
  overflow-y: auto;
}
/* scrollbar */
.modal-list::-webkit-scrollbar {
    width: 10px;
}
.modal-list::-webkit-scrollbar-track {
  width: 8px;
  border-radius: 4px;
}
.modal-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.modal-list::-webkit-scrollbar-thumb:hover {
  background: #444;
}
table {
  border-spacing: 0;
  border-collapse: collapse;
}
th, td {
  margin: 0;
  padding: 0 1px;
  height: 20px;
}
td {
  border: 1px solid #555;
}
input, select {
  box-sizing: border-box;
  width: 100px;
  height: 20px;
  line-height: 20px;
  margin: 0;
  padding: 0 1px;
  border: none;
  vertical-align: top;
  border-radius: 0;
}
.operator-header {
  border: 1px solid #555;
  text-transform: capitalize;
}
.button {
  /* margin-left: 20px; */
  margin-top: 5px;
  text-align: center;
  vertical-align: top;
  height: 20px;
  width: 250px;
  line-height: 20px;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 0 20px;
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
}
.blue {
  background-color: #06a;
}
.green {
  background-color: #2c2;
}
.red {
  background-color: #c34;
}
#timeline-table {
  height: 310px;
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
}
/* scrollbar */
#timeline-table::-webkit-scrollbar {
    width: 10px;
}
#timeline-table::-webkit-scrollbar-track {
  width: 8px;
  border-radius: 4px;
}
#timeline-table::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
#timeline-table::-webkit-scrollbar-thumb:hover {
  background: #444;
}
</style>
