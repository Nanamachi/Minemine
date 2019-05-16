<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Sweep/Miss/Remain : {{sweeped}}/{{missed}}/{{remainingMines}}</p>
    <MinesweeperMain />
  </div>
</template>

<script>
import MinesweeperMain from './MinesweeperMain.vue';
import { mapState, mapGetters } from 'vuex';

export default{
  data () {
    return {
      title: 'Try this!'
    }
  },
  components: {MinesweeperMain},
  computed: {
    ...mapState({
      missed: state => state.gameState.missed,
      sweeped: state => state.gameState.sweeped,
    }),
    ...mapGetters({
      remainingMines: 'remainingMines'
    })
  }
};
</script>

<style scoped>
h1, p{
  text-align: center;
  color: #42b983
}
</style>
