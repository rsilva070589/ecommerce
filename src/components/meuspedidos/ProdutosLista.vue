<template>   

  <!--Pizza-->
 
  <div :class="(store.pizzaSelecao.length > 0) ? ['fundoSelect'] : ['']"> 

   <div class="conteudo" v-if="store.recursos.etapaPedido==1"
               style="color: white;
               
               height: 85vh;  
               margin-top: 8px;               
               padding: 12px 0px 0px 0px;
               background-size: 100% 94vh;               
               width: 100%; 
                
   ">
   
   <div style="padding: 10px; background-color: dimgray; font-size: 20px; ">
      <i class="bi bi-chevron-down"></i>
     Sabor   
   </div>   
   
   <div :class="!(store.pizzaSelecao.length >= store.selectItem.qtdemax && store.selectItem.qtdemax > 0) ? ['classeEnable'] : ['classeDisable']"
   >
 
   <div      
   
       :class="{'classeEnable': i.select}"   
       style="padding: 8px;  
              color: black;  
              border-bottom: 1px solid Grey;                 
       "       
       v-for=" (i, index) in store.listaAtualProd" :key="i.cdproduto"       
       @click="store.selecaoProduto(i.cdproduto,i.precofinalvenda,i.descricao,index, store.selectItem.qtdemax, store.selectItem?.urlprincipal)"
       >  
       <div style="
              display: flex;
              justify-content: space-between;             
                "
                  
               >
         <div style="text-align: ;">
             
             {{i.descricao}}{{i.descricaoproduto}}
          
             <span style="font-size: 13px;
                          padding: 0;
                    ">
                    <div v-if=" i.ingredientes">
                      {{i.ingredientes}}
                    </div>
              
             </span> 
  
            <div>
              <span style="color: green;">
               <span style="color: green;"> 
                 R$  {{store.formataDinheiro( i.precofinalvenda, 2) }}                
               </span> 
             </span>       
            </div>
             
       </div>
       
        <!--css para selecionado-->
        <div v-if="(store.pizzaSelecao.length < store.selectItem.qtdemax ) 
                    && store.selectItem.qtdemax > 0 && !i.select 
                    "
             
            style="margin-top: 0px;">
           <label class="switch">  
             <IconSwitchOff fill="Grey" style=""/>
           </label>
       </div>
      <div v-if=" i.select 
                  && store.selectItem.qtdemax > 0"            
        
           style="margin: 0px;
           
           ">
          <label class="switch" >              
            <IconSwitchOn fill="green"/>
          </label>
      </div> 
   
       <div v-if="(store.pizzaSelecao.length >= store.selectItem.qtdemax) 
                  && !i.select
                  && store.selectItem.qtdemax > 0
                  "            
           style="margin-top: 0px;">
          <label class="switch" >   
            <IconSwitchOff fill="Grey"/>
          </label>
      </div>

      <div v-if="store.selectItem.qtdemax == 0  && !i.select"   
              
           style="margin-top: 0px;">
          <label class="switch" >   
            <IconSwitchOff fill="Grey"/>
          </label>
      </div>

      <div v-if="store.selectItem.qtdemax == 0  && i.select" 
          
           style="margin-top: 0px;">
          <label class="switch" >   
            <IconSwitchOn fill="green"/>
          </label>
      </div>
        <!--FIM css para selecionado-->

 
    </div> 
    
   </div>  
  </div>
   </div>
   </div>  
    
  <div v-if="store.recursos.etapaPedido==2" class="">
    <div class="conteudo"
        style="
        margin-top: 0px;
        height: 90vh;
        padding: 5px 0px 0px 0px;
        "        
    > 
    <AdicionaisProduto/>  
       <Ingredientes/> 
       
    </div>
  </div> 
 
    <!--Pizza--> 
  
 </template>
   
<script setup>
 
 import IconSwitchOn from '../icons/IconSwitchOn.vue'
 import IconSwitchOff from '../icons/IconSwitchOff.vue'
 import Ingredientes from './Ingredientes.vue'
 import AdicionaisProduto from './AdicionaisProduto.vue';
 
 
 import {indexStore} from '../../stores/index'  
 const store = indexStore();
  
 
   </script>
   
   <style>
   /* The switch - the box around the slider */
   .switch {     
     display: inline-block;
     width: 60px;
     height: 34px;
   }
    
   .conteudo {
    
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}
  
  .fundoSelect {
    background: rgb(233, 232, 231);
  } 

   </style>