<template>
  <div v-if="!store.cliente.cdcliente"
  style="margin-top: 0px; padding: 10px; margin: 70px 10px 10px 10px; text-align: center;" >
  <Telefone />
  </div>
  
  <div  v-if="store.cliente.cdcliente"
   style="background-color: grey; 
               padding: 10px;
               margin-top: 50px ;
              color: white;
              border-bottom: 1px solid black;
              ">          
          <i class="bi bi-bag-check"></i>
          <span style="padding-left: 10px; ">
            Meus Pedidos 
          </span> 
    </div>

  <div class="conteudo">
  <div class="container" 
  style="margin-top: 10px;
         background-color: whitesmoke;
         
        "
    v-if="store.cliente.cdcliente"  > 
   

      <div class="" style=" 
        border-top: 2px solid green;
                   border-bottom: 1px solid grey;
                   border-radius: 8px;
              padding: 10px;
              margin-bottom: 10px;
              background-color: #FFFFE0;"
      
        v-for="(p, indexP) in store.listaPedidosCliente.pedidos" :key="indexP">        
        <div  @click="pedidoDetalhe(p.cdpedido, p.nrsenha_entrega)">
          <div style="text-align: center;">
            <div style="color: green; font-size: 20px; padding-bottom: ;">
              <i class="bi bi-check-circle-fill"></i> Pedido: #{{p.cdpedido}}
            </div>     
          </div>
         
          <div>
            R$ 
              <span style="color: ;">
                 {{formataDinheiro(p.pedido.valorpedido, 2)}}
              </span> 
          </div>
          
          
          <div v-if="p.pedido.tipopedido == 2" style="font-size: 15px;">
            <i class="bi bi-bicycle"></i> Numero da Entrega: {{p.nrsenha_entrega}}
          </div>

          <div v-if="p.pedido.tipopedido == 1" style="font-size: 15px;">
            <i class="bi bi-handbag-fill"></i> Retirada: {{p.nrsenha_entrega}}
          </div>

          <div style="font-size: 15px; font-weight: bold; padding-bottom: 5px;">
            STATUS:  {{store.selectItem.statusDefinido=statusPedido(p.statuspedido)}}
            
          </div>

          <div style="font-size: 12px;">
            <i class="bi bi-clock"></i>  TEMPO ESTIMADO PARA ENTREGA: {{store.dadosEmpresa.dadosloja?.minentrega}}Min
          </div>
           
        </div>
      </div>
    </div> 
  </div>
</template>

<script setup>
import axios from 'axios'
import {indexStore} from '../../../stores/index'  
const store = indexStore(); 

function statusPedido (status) {
  let statusNew = 'status'
  
  if(status == 'PDP') {   statusNew='EM PREPARO'  }
  if(status == 'PDA') {   statusNew='EM ANDAMENTO'  } 
  if(status == 'PDF') {   statusNew='EM ANDAMENTO'  } 
  if(status == 'PDF') {   statusNew='FINALIZADO'  } 
  if(status == 'PCC') {    statusNew='CANCELADO'  } 
  if(status == 'PDR') {    statusNew='EM PREPARO'  } 
  if(status == 'PDR') {    statusNew='RETIRADO'  }  
  
  return statusNew
}

function formataDinheiro(item) {
         let venda = item;
         if (!!venda && venda.toString().includes(",")) {
           venda = venda.toString().replace(",", ".");
         }
         return parseFloat(venda)
           .toFixed(2)
           .replace(".", ",")
           .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
       }

const getPedidosCliente = ()=> {
 
var data = JSON.stringify({
  "databasecliente": store.recursos.databasecliente,
  "cdcliente": store.cliente.cdcliente,
  "cdpedido": 0,
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
  
  store.listaPedidosCliente = response.data
  console.log(store.listaPedidosCliente)
})
.catch(function (error) {
  console.log(error);
});

}

getPedidosCliente()

const pedidoDetalhe = (cdpedido,getnrsenha_entrega)=>{
  store.recursos.telaAtualNome='STATUS DO PEDIDO'
  store.recursos.telaContentAtual='STATUSPEDIDO'
  store.selectPedido.cdpedido=cdpedido
   
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
</style>