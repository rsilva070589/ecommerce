<template>
  <div v-if="store.recursos.carregando"
    style="display: flex; justify-content: center; padding-top: 100px; ;
    "
>
    
      <div class="spinner-border text-danger" role="status" style="width: 100px; height: 100px;">
        <span class="sr-only"></span>
      </div>
 
  </div>
</template>

<script setup>
 import {indexStore} from '../../stores/index' ;
const store = indexStore(); 
</script>

<style>

</style>