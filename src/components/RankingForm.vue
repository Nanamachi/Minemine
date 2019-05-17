<template>
  <div class="container">
    <h2>Your Score is {{score}}!</h2>
    <form class="form-group">
      <div class="row">
        <input
          class="form-control-sm col-2 offset-1"
          placeholder="Name"
          v-model="name"
        >
        <input
          class="form-control-sm col-5 offset-1"
          placeholder="Comment"
          v-model="comment"
        >
        <button
          class="btn-sm btn-primary offset-1 col-2"
          v-on:click.prevent="send"
        >
          SEND
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
const axios = require('axios');

export default {
  props: [
    'name',
    'comment'
  ],
  computed: {
    ...mapGetters({
      score: 'score',
    }),
    ...mapState({
      missed: state => state.gameState.missed,
      sweeped: state => state.gameState.sweeped,
      clearedAt: state => state.gameState.clearedAt.toISOString(),
      runtime: state => state.gameState.runtime,
      rankingPosted: state => state.gameState.rankingPosted,
    })
  },
  methods: {
    send () {
      let data = {
        name: this.name,
        comment: this.comment,
        score: this.score,
        missed: this.missed,
        sweeped: this.sweeped,
        runtime: this.runtime,
        cleared_at: this.clearedAt
      };
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/',
        data: data,
      }).then( () => {
        this.$store.commit('rankingPosted')
      });
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  color: #42b983;
}
input {
  display: flex;
  flex-flow: column wrap;
}
</style>
