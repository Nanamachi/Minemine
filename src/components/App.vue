<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Sweep/Miss/Remain : {{sweeped}}/{{missed}}/{{remainingMines}}</p>
    <MinesweeperMain />
    <RankingForm v-if="clearedAt && !rankingPosted" />
    <RankingTable v-if="rankingPosted" />
  </div>
</template>

<script>
import MinesweeperMain from './MinesweeperMain.vue';
import RankingForm from './RankingForm.vue';
import RankingTable from './RankingTable.vue';
import { mapState, mapGetters } from 'vuex';

export default{
  data () {
    return {
      title: 'Try this!'
    }
  },
  components: {MinesweeperMain, RankingForm, RankingTable},
  computed: {
    ...mapState({
      missed: state => state.gameState.missed,
      sweeped: state => state.gameState.sweeped,
      clearedAt: state => state.gameState.clearedAt,
      rankingPosted: state => state.gameState.rankingPosted,
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
