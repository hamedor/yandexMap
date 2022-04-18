<template>
  <div id="app">
    <YandexMap />
  </div>
</template>

<script>
import YandexMap from './components/YandexMap.vue'

export default {
  name: 'App',
  components: {
    YandexMap
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 1600px;
  margin: 0 auto;
}
</style>
