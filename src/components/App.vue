<template>
  <div>
    <h1>{{ title }}</h1>
    <MinesweeperMain />
  </div>
</template>

<script>
import MinesweeperMain from './MinesweeperMain.vue';

export default{
  data () {
    return {
      title: 'Try this!'
    }
  },
  components: {MinesweeperMain}
};
</script>

<style scoped>
h1{
  text-align: center;
  color: #42b983
}
</style>
