<template>

<div >

   
    <div class="center">
        <img  style="margin-top: 10px"
              width="120" height="120" 
              :src="store.dadosEmpresa.dadosloja?.img_logo" alt="">
              
      </div>
 
      
    <div style="padding: 15px; border-bottom: 1px groove;"
        @click="store.selectItem.tipoEntrega=0;
                 store.recursos.telaContentAtual='GRUPOPRODUTOS';
                 store.recursos.telaAtualNome='CARDAPIO';
                 store.recursos.sidebar = false;
         "
    >
        <IconBook style="width: 20px;"/>
        <span style="margin: 10px;">Cardápio</span> 
    </div>
        
    
    <div 
        @click="store.recursos.telaAtualNome='LISTA DE PEDIDOS';
                store.recursos.telaContentAtual='LISTAPEDIDO';
                store.recursos.sidebar=false
                "
    style="padding: 15px; border-bottom: 1px groove;">
        <IconShopbasket style="width: 20px;"/>
        <span style="margin: 10px;">Meus Pedidos</span> 
    </div>

    <div @click="store.recursos.telaAtualNome='AREA DE ENTREGA';
                store.recursos.telaContentAtual='AREAENTREGA';
                store.recursos.sidebar=false
                "  
         style="padding: 15px; border-bottom: 1px groove;">
        <i class="bi bi-bullseye"></i>
        <span style="margin: 10px;">Área de Entrega</span> 
    </div>

    
    <div  style="padding: 15px; border-bottom: 1px groove;">
        <i class="bi bi-telephone-fill"></i>
        <a :href="telefone"> 
            <span style="margin: 10px; color: black;">Pedir por telefone</span>             
        </a>
    
    </div>

    <div  @click="store.recursos.telaAtualNome='DADOS DA MINHA CONTA';
                store.recursos.telaContentAtual='MINHACONTA';
                store.recursos.sidebar=false
                "  
        style="padding: 15px; border-bottom: 1px groove;">
        <i class="bi bi-person-circle"></i>
        <span style="margin: 10px;">Minha Conta</span> 

    </div>
 
  
    
</div>

 
</template>

<script setup>
import IconBook from '../icons/IconBook.vue';
import IconShopbasket from '../icons/IconShopbasket.vue';
 
import {indexStore} from '../../stores/index'
const store = indexStore(); 

const telefone = 'tel:' + store.dadosEmpresa.dadosloja?.fonecel

</script>

<style>

</style>