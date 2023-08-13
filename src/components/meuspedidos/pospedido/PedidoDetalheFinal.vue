<template>
    
  <div  
  style=" margin-top: 40px;
              padding: 20px;
              height: 100vh;
              background-color: #FFFFE0; 
              text-transform:uppercase;
              font-size: 13px;
  " 
  v-for="(p, indexP) in store.pedidoAtual.pedido" :key="indexP"
  >
  <div style="text-align: center; display: flex; justify-content: space-between;">
    <div v-if="p.pedido.tipopedido==2" 
        style="font-size: 23px; font-weight: bold;">
       ENTREGA
    </div>    
    <div v-if="p.pedido.tipopedido==1" 
    style="font-size: 23px; font-weight: bold;">
       SENHA
    </div>   
    <div style="font-size: 23px; font-weight: bold;">
      {{p.nrsenha_entrega}}
    </div>         
  </div>
  
  
    <div style=" 
                  display: flex; 
                  justify-content: space-between; 
                  padding-bottom: 5px;">
      <div>
        {{p.pedido.datahora_pedido}} 
      </div>
      
      <div style="font-style: bold">
        {{p.cdpedido}}  
      </div>
    
  </div>
 
  <div style=" border-bottom: 1px dashed Grey;">
    STATUS: 
      <span style="color: orangered;">        
        <PedidoStatus />        
      </span> 
  </div>

  <div  style="padding: 10px 0px 10px 0px;  border-bottom: 1px dashed Grey; ">
    <div>
      CLIENTE: {{store.cliente.nome}} 
    </div>
    
    <div> 
      TEL.: {{store.cliente.fonecel}}  
    </div>

    
    <div
         v-if="p.pedido.tipopedido==2"
           >            
      Logradouro:   {{store.cliente.enderecos[store.selectItem.indexEndereco]?.logradouro}}
      Cidade:       {{store.cliente.enderecos[store.selectItem.indexEndereco]?.cidade}}
      Bairro:       {{store.cliente.enderecos[store.selectItem.indexEndereco]?.bairro}}
      Nº Casa:      {{store.cliente.enderecos[store.selectItem.indexEndereco]?.nrendereco}}
      Referência:   {{store.cliente.enderecos[store.selectItem.indexEndereco]?.complementoendereco}}      
      
    </div>

  </div>
  
  <div class="grid-container" style=" padding: 10px 0px 10px 0px;  
                border-bottom: 1px dashed Grey; 
            
              ">    
    
    <div class="item2" style="width: 15px;">QTDE</div>
    <div class="item2" style="width: 150px;"> <span style="text-align:right;">item</span> </div>
    <div class="item3"></div>
    <div class="item3" style="text-align:right;">Preço</div>
      
  </div>

 
  
<div v-for="(p1, indexP1) in p.pedido.pedidoitem" :key="indexP1">
  <div   class="grid-container"
  style="padding: 10px 0px 10px 0px;"                
         >    
         
      <div class="item2" style="width: 15px;">{{p1.quantidade}}</div>
      <div class="item2" style="width: 200px;"> 
      <span style="text-align:right;">{{p1.descricao}}</span> 
      <div style="margin-left: 8px; font-size: 11px;"
         v-for="(p2, indexP2) in p1.adicionais" :key="indexP2"
      >
      {{p2.descricao}} {{store.formataDinheiro(p2.valortotal,2)}}     
      </div>
      </div>
      <div class="item3"></div>
      <div class="item3" style="text-align:right;">{{store.formataDinheiro(p1.valortotal,2)}}</div>

    </div>
  </div>
 
  <div style=" border-bottom: 1px dashed Grey; "></div>

  <div  style="border-bottom: 1px dashed Grey; padding: 10px 0px 10px 0px; display: flex; justify-content: space-between;">
    <div>
      TOTAL ITENS:
    </div>
    <div>
       {{store.formataDinheiro(p.pedido.valorpedido - p.pedido.taxaentrega,2)}}   
    </div>
     
  </div>

  <div  style="border-bottom: 1px dashed Grey; padding: 10px 0px 10px 0px; display: flex; justify-content: space-between;">
    <div>
      TAXA DE ENTREGA:
    </div>
    <div>
     + {{store.formataDinheiro(p.pedido.taxaentrega,2)}}
    </div>    
  </div>

  <div  style="margin: 0px 0px 8px 0px; border-bottom: 1px dashed Grey; ">
    <div  style=" padding: 10px 0px 0px 0px; display: flex; justify-content: space-between;">
    <div style="font-size: 17px;">
      VALOR PEDIDO
    </div>
    <div style="font-size: 17px;">
      {{store.formataDinheiro(p.pedido.valorpedido,2)}}
    </div>  
  </div>
 
      <div v-if="p.pedido.valortroco > 0" style="display: flex; justify-content: space-between;">
        <div>
          troco
        </div>
        <div>
          {{store.formataDinheiro(p.pedido.valortroco - p.pedido.valorpedido,2)}}
        </div>       
       
      </div>
    <div style="display: flex; justify-content: space-between;">
      

      <div>
        Forma de Pagamento:   
      </div>
      <div>
        {{p.pedido.nomeplanopagamento}}
      </div>     
      
    </div>
    <div v-if="p.pedido.nomeplanopagamento=='PIX'"
      style="display: flex;" >
      chavepix: 
    <div v-for="(p, indexP) in store.formaspgto.pagamentos" :key="indexP"
    style="padding-left: 3px;"
    >        
        {{p.chavepix}}
      
      </div>
    </div>
    
   
  <div>  
    
  </div>

</div> 

<div>
  <div v-if="p.pedido.tipopedido==2" 
            style="text-align: center;"
         >
       
   TEMPO P/ ENTREGA: {{store.dadosEmpresa.dadosloja.minentrega}} MIN  <i class="bi bi-clock"></i>
    </div>    
    <div v-if="p.pedido.tipopedido==1" 
    >
    TEMPO P/ RETIRADA: {{store.dadosEmpresa.dadosloja.minretirada}} MIN  <i class="bi bi-clock"></i>
    </div>   
   
    <div>
 
    </div>
    
</div>
  
  
  </div>

<Carregando />

</template>

<script setup>
import PedidoStatus from './PedidoStatus.vue'
import Carregando from '../../content/Carregando.vue';
import axios from 'axios'
import {indexStore} from '../../../stores/index'  
const store = indexStore();  

var tempo = null;
 
 

 
 


console.log('Codigo do Pedido atual é' + store.selectPedido.cdpedido)
 
const getPedido = (cdpedido)=> {
  var data = JSON.stringify({
    "databasecliente": store.recursos.databasecliente,
    "cdcliente": store.cliente.cdcliente,
    "cdpedido": store.selectPedido.cdpedido,
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
    //store.listaPedidosCliente = response.data
    store.pedidoAtual.pedido =  response.data.pedidos
    console.log(store.pedidoAtual.pedido) 
  })
  .catch(function (error) {
    console.log(error);
  });
}
getPedido()

 
          
 

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