<template>
     

   <span v-if="!store.pedidoAtual.pedido.statuspedido">
      {{store.selectItem.statusDefinido}}
  </span>  
 
  <span v-if="store.pedidoAtual.pedido.statuspedido=='FINALIZADO'">
      FINALIZADO
  </span>

  <span v-if="store.pedidoAtual.pedido.statuspedido=='CANCELADO'">
      CANCELADO
  </span>

  <span v-if="store.pedidoAtual.pedido.statuspedido !='CANCELADO' && store.pedidoAtual.pedido.statuspedido !='FINALIZADO'">
    {{store.pedidoAtual.pedido.statuspedido}}
  </span>

</template>

<script setup>
import Carregando from '../../content/Carregando.vue';
import axios from 'axios'
import {indexStore} from '../../../stores/index'  
const store = indexStore();  

var tempo = null;
 

function updateStatusPedido (cdcliente, cdpedido) {
    var data = JSON.stringify({
    "databasecliente": "BancoDadosSuaPizzaria.fdb",
    "cdcliente": cdcliente,
    "cdpedido": cdpedido,
    "statuspedido": ""
  });

  var config = {
    method: 'post',
    url: 'https://easypedidos.sytes.net:8082/evento/getdadospedidos',
    headers: { 
      'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
   
   store.pedidoAtual.pedido.statuspedido= statusPedido(response.data.pedidos[0].statuspedido)
 console.log('status do pedido atual é '+ store.pedidoAtual.pedido.statuspedido)
 
 
  })
  .catch(function (error) {
    console.log(error);
  });
}
 
 
  
  var timer;
          
  function startTimer() { 
 
    timer = setInterval(function() {  
        if (store.pedidoAtual.pedido.statuspedido != 'FINALIZADO' && store.pedidoAtual.pedido.statuspedido != 'CANCELADO') {
         updateStatusPedido(store.cliente.cdcliente, store.selectPedido.cdpedido) 
          
        }else{

        }console.log('parado de buscar')
        
    }, 60000);
  }
      
  startTimer()
          
 

 function statusPedido (status) {
  let statusNew = ''
  if(status == 'PDP') {   statusNew='EM PREPARO'  }
  if(status == 'PDA') {   statusNew='EM ANDAMENTO'  }   
  if(status == 'PDF') {   statusNew='FINALIZADO'  } 
  if(status == 'PCC') {    statusNew='CANCELADO'  }   
  if(status == 'PDR') {    statusNew='RETIRADO'  }      
  return statusNew
}

</script>

<style>
.conteudo {    
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}

 
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;    
  padding: 0px;
}



.item1 {
  grid-column: 1 / span 2;
}


</style>