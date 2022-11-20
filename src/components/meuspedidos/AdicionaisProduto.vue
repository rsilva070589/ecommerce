<template>
 
  <div 
    v-for="i in store.adicionaisProduto" :key="i.cdproduto">
    <div style="background-color: grey; 
                padding: 8px;
                color: white;                                
                ">
      <div> 
        {{i.desc_grupo_adc}}  
      </div> 
      <span style="font-size: 15px;">
        {{i.orientacao_grupo_adc}}
      </span>
    </div> 
    
    

    <AdicionaisItensProduto    :cdgrupoadc="i.cdgrupoadc"
                               :qtdemin="i.qtdemin"
                               :qtdemax="i.qtdemax"
    />
</div>
 
 

</template>

<script setup>
 
import AdicionaisItensProduto from './AdicionaisItensProduto.vue'
import {indexStore} from '../../stores/index'  
const store = indexStore(); 
 
//console.log(store.adicionaisProduto)


store.adicionaisProduto.forEach(function(dados) {   
   dados.adicionaisitensproduto.forEach(function(dados1, index, array){   
 
    var itemAdicionalGrupo = {  
                                cdgrupoadc: dados.cdgrupoadc,
                                esabor: dados.esabor,
                                cdproduto: dados1.cdproduto,
                                descricaoproduto: dados1.descricaoproduto,
                                ordemprodadc: dados1.ordemprodadc,
                                precofinalvenda: dados1.precofinalvenda }
                

   store.adicionaisItensProduto.push(itemAdicionalGrupo)
  
   }) 
})

</script>

<style>

</style>