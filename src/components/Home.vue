<template>
     <Navbar />
           
     
     <div style="display: grid; width: 100%; margin-top: ;">
       <div>   
        <HomeContent />
       </div>
 
       <div class="box-carrinho"
           v-if="store.recursos.sidebar">
        <Sidebar  />       
      </div>
  

   
     </div>

     <div>
      
    </div>

    <ButtonAvancarCarrinho v-if="store.recursos.etapaPedido == 2"/>
   
</template>

<script setup> 

import ButtonAvancarCarrinho from './meuspedidos/ButtonAvancarCarrinho.vue';
import axios from 'axios';
import Navbar from './navbar/Navbar.vue';
import HomeContent from './content/HomeContent.vue';
import Sidebar from './sidebar/Sidebar.vue'
import {indexStore} from '../stores/index'
 const store = indexStore(); 



</script>

 
<style>
  body {
        margin: 0px
    } 
 
.box-carrinho {
  width: 270px;
  height: 100vh;   
  background: white;  
  position: absolute;
}
.box-carrinho-mobile {
  width: 100%;
  height: 100vh;  
  position: fixed;
  background: white;  
}
.box-cardapio { 
  background: white;
  display: flexbox;  
  width: 100%;  
  height: 100%;  
  flex-direction: row;
  justify-content: space-between;
}
.box-detalheprod {
        border-radius: 15px;
        border-style: inset;
        position: fixed;
        width: 98%;
        height: auto;
        background: white;
        margin: 50px 0px 0px 350px;
    }
.box-detalheprod-mobile {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: white; 
  }
 
.box-obs {
  width: 380px;
  height: 100vh;  
  right: 0px;
  position: fixed;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
  background: white;  
}
.box-obs-mobile {
  width: 100%;
  height: 100vh;  
  position: fixed;
  background: white;  
}
 
</style> 