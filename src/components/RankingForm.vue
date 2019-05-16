<template>
  <div class="container">
    <h2>Your Score is {{score}}!</h2>
    <form class="form-group">
      <div class="row">
        <input class="form-control-sm col-2 offset-1" placeholder="Name">
        <input class="form-control-sm col-5 offset-1" placeholder="Comment">
        <button class="btn-sm btn-primary offset-1 col-2">SEND</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      score: 'score'
    })
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
