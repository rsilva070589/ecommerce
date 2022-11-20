<template>
     <i style="position: fixed;
              margin: 5px 0px 0px -32px;
              
    " class="bi bi-cart-fill"></i>
    <span style="margin: 0px -5px 0px -20px; 
                padding: 6px;
                width: 20px;
                height: 20px;
                background-color: red;
                border-radius: 50%;
                font-size: 14px;
                position: fixed;
          ">
      
          <span v-if="!store.pedido.pedido" style="position: fixed; margin: -0px 0px 0px 0px; font-weight: bold;">
            0
          </span>
          <span style="position: fixed; margin: -6px 0px 0px 0px; font-weight: bold;">
            {{store.pedido.pedido?.pedidoitem.length}}  
          </span> 
      
    </span>
</template>

<script setup>
import {indexStore} from '../../stores/index'
 const store = indexStore(); 
</script>

<style>

</style>