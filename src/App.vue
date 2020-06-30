<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
    }
  }
</script>

<style lang="scss">
  .container {
    margin: 15px;
    padding: 15px;
    background-color: #fff;

    p {
      margin: 0;
    }
  }
</style>
