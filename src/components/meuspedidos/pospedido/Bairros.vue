<template>
 
  <div class="search-wrapper">
    <input type="text" v-model="store.bairroSearch" placeholder="Search title.."/>
        <label>Search title:</label>
  </div>

  {{store.bairroSearch}}
{{store.bairros.bairros.filter(b => b.bairro.toLowerCase().includes(store.bairroSearch.toLocaleLowerCase()))}}

 
</template>

<script setup>
import axios from 'axios'
import {indexStore} from '../../../stores/index'  
const store = indexStore();  
 
</script>

<style>
 
 
</style>