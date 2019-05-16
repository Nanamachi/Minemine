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
export default {
  data () {
    return { 
      opened: false,
      marked: false,
    }
  },
  props: {
    row: Number,
    column: Number,
    isMine: {
      type: Boolean,
      required: true,
    },
    surroundingMinesCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    state: function(){
      if (this.opened) {
        if (this.isMine) {
          return "x"
        } else {
          return this.surroundingMinesCount
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
    }
  },
  methods: {
    open: function () {
      if (this.state === '') {
        this.opened = true;
        if (this.isMine) {
          alert('Oops!');
        }
      }
    },
    mark: function () {
      if (this.state === '') {
        this.marked = true;
        if (!this.isMine) {
          alert('???');
        }
      }
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
