<template> 
<div  style="margin-top: 0px; padding-bottom: 19px;">
  <div v-for="(l, index) in store.pizzaSelecao" :key="index"
 >
 <div style="background-color: grey; 
                padding: 5px 5px 5px 5px;             
                height: 35px;   
                color: white;">
Ingredientes: {{l.descricao}}
 </div>
  
  <IngredientesItens 
            :cdproduto="l.cdproduto" :descricao="l.descricao" 
            />
 </div> 
</div>
 
    
</template>

<script setup>
import IngredientesItens from './IngredientesItens.vue';
import {indexStore} from '../../stores/index'  
const store = indexStore(); 
  
  

</script>

<style>
   
  .classeEnable { 
    background: white;
  }

  .classeDisable {
    background: rgb(233, 232, 231);
    
  }
</style>