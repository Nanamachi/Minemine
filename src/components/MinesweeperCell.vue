<template>
  <div
    v-on:click.left.prevent="open()"
    v-on:click.right.prevent="mark()"
    v-bind:class="{mine: isMine && opened, opened: opened, marked: marked, missmarked: !isMine && marked}"
  >
    {{ state }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    row: Number,
    column: Number,
    addressNumber: Number,
  },
  computed: {
    state: function(){
      if (this.opened) {
        if (this.isMine) {
          return "x"
        } else {
          if (this.surroundingMinesCount !== 0) {
            return this.surroundingMinesCount
          } else{
            return ''
          }
        }
      }
      if (this.marked) {
        if (this.isMine) {
          return "F"
        } else {
          return "M"
        }
      }
      return '';
    },
    ...mapState({
      isMine ( state ) { return state.boardState[this.addressNumber].isMine },
      opened ( state ) { return state.boardState[this.addressNumber].opened },
      marked ( state ) { return state.boardState[this.addressNumber].marked },
      surroundingMinesCount ( state ) { return state.boardState[this.addressNumber].surroundingMinesCount },
    })
  },
  methods: {
    open () {
      this.$store.dispatch('open', this.addressNumber)
    },
    mark () {
      this.$store.dispatch('mark', this.addressNumber)
    }
  }
}
</script>

<style scoped>
* {
  font-size: 12px;
  text-align: center;
}
div{
  width: 20px;
  height: 20px;
  border: 0.1px solid #666;
  background-color: #333;
}
.opened{
  background-color: #ccc;
}
.marked{
  background-color: #9f9;
}
.mine{
  background-color: #f99;
}
.missmarked{
  background-color: #99f;
}
</style>
