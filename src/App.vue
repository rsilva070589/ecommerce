

<template>
  <div id="root">      
  <RouterView />
</div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { indexStore } from './stores/index.js'
 const store = indexStore();
 
</script>

<style scoped>
</style>
