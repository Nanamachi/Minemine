<template>
  <div class="board">
    <div v-for="j in Array(size[0]).keys()" class="row">
      <MinesweeperCell
        v-for="i in Array(size[1]).keys()"
        v-bind:row="j"
        v-bind:column="i"
        v-bind:key="j * size[1] + i"
        v-bind:is-mine="minePosition.includes(j * size[1] + i) ? true : false"
        v-bind:surrounding-mines-count="surroundingMinesCount(j, i)"
      />
    </div>
  </div>
</template>

<script>
import MinesweeperCell from './MinesweeperCell.vue'

const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]]
  }
  return arr
}

export default{
  data () {
    return {
      size: [ 30, 50 ],
    }
  },
  components: {MinesweeperCell},
  computed: {
    minePosition () {
      return shuffle(
        [...Array(this.size[0] * this.size[1]).keys()]
      ).slice(
        0, Math.floor( this.size[0] * this.size[1] * 0.2 )
      )
    }
  },
  methods: {
    surroundingMinesCount (row, column) {
      let minesCount = 0;
      for (let i = row - 1; i < row + 2; i++){
        if ( i < 0 ) { continue };
        if ( i >= this.size[0] ) { continue };
        for (let j = column - 1; j < column + 2; j++){
          if ( j < 0 ) { continue };
          if ( j >= this.size[1] ) { continue };
          if ( i === row && j == column ) { continue };
          if ( this.minePosition.includes( i * this.size[1] + j ) ) {
            minesCount++;
          }
        }
      }
      return minesCount;
    },
  }
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

