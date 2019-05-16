<template>
  <div class="board">
    <div
      v-for="j in Array(size[0]).keys()"
      v-bind:key="`row-${j}`"
      class="row"
    >
      <MinesweeperCell
        v-for="i in Array(size[1]).keys()"
        v-bind:row="j"
        v-bind:column="i"
        v-bind:address-number="j*size[1]+i"
        v-bind:key="`cell-${j * size[1] + i}`"
      />
    </div>
  </div>
</template>

<script>
import MinesweeperCell from './MinesweeperCell.vue'

export default{
  components: {MinesweeperCell},
  beforeCreate () {
    this.$store.commit('initialize', { size: [10, 10], mines: 10 });
  },
  computed: {
    size () { return this.$store.state.boardOption.size }
  },
}
</script>

<style scoped>
.board{
  display: flex;
  flex-flow: column wrap;
}
.row{
  display: flex;
  justify-content: center;
}
</style>

