<template>
  <div class="container">
    <h2>Your Score is {{score}}!</h2>
    <h2>Score has been posted.</h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      score: 'score',
    }),
  },
}
</script>

<style scoped>
h2 {
  text-align: center;
  color: #42b983;
}
</style>
