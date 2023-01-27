<template>
  <Search/>
</template>

<script setup lang="ts">
  import Search from './components/Search.vue'
</script>

<style lang="scss">
  :root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    --dark: #242424;
    --black: #0f0f0f;
    --white: #e5e5e5;
    --grey: #929292;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    display: flex;
    place-items: center;
    min-width: 320px;
    min-height: 100vh;
  }

  #app {
    min-height: 100vh;
    max-width: 1280px;
    padding: 20% 0;
    margin: 0 auto;
    text-align: start;
  }


</style>