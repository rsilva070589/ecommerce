<template>
  <div style="background-color: #a40000;
              position: fixed;              
              display: flex;
              width: 100%;
              height: 50px; 
              color: white;
              font-size: 20px;
              padding: 8px;
              justify-content: space-between;
            
  ">

 <div style="display: flex;">
  <div v-if="store.recursos.telaContentAtual == 'DADOSEMPRESA'" 
       @click="sidebar"
        style="fill: white;
               margin: 0px 0px 0px 5px;
  ">
    <i class="bi bi-list"></i>
  </div>

  <div v-if="store.recursos.telaContentAtual != 'DADOSEMPRESA'" 
       @click="rotaVoltar()"
        style="fill: white;
               margin: 0px 0px 0px 5px;
  ">
    <i class="bi bi-arrow-left"></i>
  </div>

  <div style="margin: 0px 0px 0px 20px;">
    {{store.recursos.telaAtualNome}}
  </div> 
 </div>
  

  <div @click="store.recursos.etapaPedido=3 ;
       store.recursos.alertaCarrinho=false
       store.recursos.telaContentAtual='PRODUTOS';
       store.recursos.telaAtualNome='CARRINHO'">
    <IconCarrinho />
  </div>
  

</div>
</template>



<script setup>
import IconCarrinho from '../icons/IconCarrinho.vue';
import {indexStore} from '../../stores/index'
 const store = indexStore(); 

 const sidebar = ()=> {
  if (store.recursos.sidebar) {
    store.recursos.sidebar = false
  }else{
    store.recursos.sidebar = true
  }
 }

 

 function rotaVoltar () {
  switch(1==1) {
  case store.recursos.telaContentAtual=='TIPORETIRADA':
          store.recursos.telaContentAtual='DADOSEMPRESA';
          store.recursos.telaAtualNome='BEM-VINDO';
   
    break;
  case store.recursos.telaContentAtual=='GRUPOPRODUTOS':
          store.recursos.telaContentAtual='TIPORETIRADA';   
          store.recursos.telaAtualNome='TIPO DE ENTREGA';       
    break;
  case store.recursos.telaContentAtual=='PRODUTOS' :
        store.recursos.telaContentAtual='GRUPOPRODUTOS'; 
        store.recursos.telaAtualNome='CARDAPIO';   
        store.recursos.etapaPedido = 99 ;      
  break;
  case store.recursos.telaContentAtual=='PRODUTOS2':
        store.recursos.telaContentAtual='GRUPOPRODUTOS'; 
        store.recursos.telaAtualNome='CARDAPIO';         
  break;
  //case store.recursos.telaContentAtual=='STATUSPEDIDO':
  //      store.recursos.telaContentAtual='FINALIZAR'; 
  //      store.recursos.telaAtualNome='FINALIZAR PEDIDO';         
  //break;
  case store.recursos.telaContentAtual=='FINALIZAR':
        store.recursos.telaContentAtual='CADASTRO'; 
        store.recursos.telaAtualNome='CADASTRO';         
  break;
  case store.recursos.telaContentAtual=='CADASTRO':        
        store.recursos.telaAtualNome='CARRINHO'; 
        store.recursos.telaContentAtual='PRODUTOS'
        store.recursos.alertaCarrinho=false
        store.recursos.etapaPedido = 3       
  break;
  case store.recursos.telaContentAtual=='LISTAPEDIDO':        
  store.recursos.telaContentAtual='DADOSEMPRESA';
          store.recursos.telaAtualNome='BEM-VINDO'; 
  break;
  case store.recursos.telaContentAtual=='STATUSPEDIDO':        
          store.recursos.telaAtualNome='LISTA DE PEDIDOS';
          store.recursos.telaContentAtual='LISTAPEDIDO';
  break;
  case store.recursos.telaContentAtual=='MINHACONTA' &&  store.recursos.telaAtualNome=='TROCAR ENDEREÇO' :        
         store.recursos.telaContentAtual='FINALIZAR';
          store.recursos.telaAtualNome='FINALIZAR PEDIDO';
  break;
  case store.recursos.telaContentAtual=='MINHACONTA':        
         store.recursos.telaContentAtual='DADOSEMPRESA';
          store.recursos.telaAtualNome='BEM-VINDO';
  break;

  case store.recursos.telaContentAtual=='AREAENTREGA':        
         store.recursos.telaContentAtual='DADOSEMPRESA';
          store.recursos.telaAtualNome='BEM-VINDO';
  break;
  case store.recursos.telaContentAtual=='ENDERECO':   
        store.recursos.telaContentAtual='FINALIZAR';
        store.recursos.telaAtualNome='FINALIZAR PEDIDO';
  break;
  case store.recursos.telaContentAtual=='SELECTPRODUTO':   
        store.recursos.telaContentAtual='PRODUTOS';
        store.recursos.telaAtualNome='CATALAGO';
  break;


 
  default:
    // code block
} 
} 

 
</script>

<style>
a{
  position:relative;
}
.label{
  position:absolute;
  top:-15px;
  right:-12px;
}
</style>