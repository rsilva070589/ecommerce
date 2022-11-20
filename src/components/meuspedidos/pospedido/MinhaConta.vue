<template>

<div style="background-color:  whitesmoke; margin-top: 50px;">



  <div v-if="!store.cliente.cdcliente"
  style="margin-top: 0px; 
        padding: 10px; 
        margin: 70px 10px 10px 10px; 
        text-align: center;       
        " >
  <Telefone />
 
  </div>


  <div v-if="store.cliente.cdcliente">

  
    <div v-if="store.recursos.telaAtualNome !='TROCAR ENDEREÇO'"
     style="background-color: grey; 
              margin-top: 50px; padding: 10px;
              color: white;
              border-bottom: 1px solid black;
              ">          
          <i class="bi bi-emoji-smile"></i>
          <span style="padding-left: 10px;">
            {{store.cliente.nome}}
          </span> 
    </div>

    <div v-if="store.recursos.telaAtualNome !='TROCAR ENDEREÇO'"
    style="padding: 10px;"
    >
    
    <div>          
          Codigo cliente: {{store.cliente.cdcliente}}
        </div>
        <div>          
          Nome: {{store.cliente.nome}}
        </div>
        <div>          
          Telefone: {{store.cliente.fonecel}}
        </div> 
  </div>

  <div style="background-color: grey; 
               padding: 10px;
              color: white;
              border-bottom: 1px solid black;
              ">          
          <i class="bi bi-house"></i>
          <span style="padding-left: 10px; ">
            Endereços: 
          </span> 
    </div>
  
  <div v-if="store.cliente.cdcliente > 0"    
    style="margin-top: 0px; padding: 10px; margin: 0px 0px 0px 0px; ">   
    
     
  <div v-if="store.recursos.telaAtualNome =='TROCAR ENDEREÇO'"
      style="text-align: center;"
  >
    Clique em cima do Endereço de sua escolha!
  </div>
        
  
    <div class="" 
            style="background-color: white;
                   padding: 10px ;
                   margin-top: 10px; 
                   border-top: 2px solid green;
                   border-bottom: 1px solid grey;
                   color: gray;
                   border-radius: 8px;
                   "
            v-for="(e, indexE) in store.cliente.enderecos" :key="indexE"
            @click="selectEndereco(indexE, e.cdcliente_end)"
        > 
            Logradouro: {{e.logradouro}}
            Cidade:     {{e.cidade}}
            Bairro:     {{e.bairro}}
            Nº Casa:    {{e.nrendereco}} 
            Referência: {{e.complementoendereco}} 
        </div>
        
  </div>
</div>    
  

  
</div>
</template>

<script setup>
import Telefone from './Telefone.vue';
import {indexStore} from '../../../stores/index'  
const store = indexStore(); 

const selectEndereco = (indexE, cdcliente_end) => {
  
  store.selectItem.indexEndereco = indexE
  store.pedido.pedido.cdendereco = cdcliente_end
  
  if (store.recursos.telaAtualNome=='TROCAR ENDEREÇO') {
    store.recursos.telaContentAtual='FINALIZAR'
    store.recursos.telaAtualNome='FINALIZAR PEDIDO'
  }

}

</script>

<style>

</style>