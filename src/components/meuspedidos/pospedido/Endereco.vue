<template>
  <div style="color: white;              
              padding: 25px 10px 10px 10px; 
              width: 100%;                
              font-size: 13px;
  "       
  >
   
  <div         
              style="font-size: 20px; 
              text-align: center;              
              ">
  
  CADASTRE SEU ENDEREÇO
  </div>          

  <div style="padding-bottom: 15px;" >
    Bairro: *  
 
    <div v-if="store.bairroUpdateCreate.validation.optionSelect == true
              && store.bairroUpdateCreate.optionSelect == null
    " 
      style="color: red; font-size: 20px;
      background-color: white;
      width: 100%;
      height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;
      border-bottom: 1px solid black;
      ">
      BAIRRO É OBRIGATÓRIO! *
    </div>
    


    <div  >

      <div  class="card" >

      
  <div
      style="color: black; display: flex; padding: 10px; font-size: 15px;"
      @click="store.recursos.openBairros = true"
      v-if="!store.recursos.openBairros" 
      >
    <div  style="width: 95%;">
      {{store.bairroUpdateCreate.optionSelect?.bairro}}
<div v-if="!store.bairroUpdateCreate.optionSelect?.bairro"
      style="color: grey;"
>
  Selecione um Bairro
</div>

    </div>
    <div   style="color: black;">
          <i class="bi bi-chevron-down"></i>
    </div>  
  </div>
    
  </div>    
  
  <div class="card" v-if="store.recursos.openBairros">

     
    <div style="display: flex; padding: 10px; font-size: 15px;">
      <input style="width: 95%;" type="text" 
              :value='store.bairroSearch'
              @input='evt=>store.bairroSearch=evt.target.value'
              placeholder="filtrar bairro"/>
        <span 
        @click="store.recursos.openBairros = false"
        style="color: black; padding: 5px; ">
          <i style class="bi bi-chevron-up"></i>
        </span>  
    </div>
      


        <div class="conteudo" style="height: 30vh; ">
          <div          
              style="color: black; display: flex; padding: 5px 10px 0px 15px ; font-size: 15px;"              
              v-for="(b, indexB) in store.bairros.bairros.filter(b => b.bairro.toLowerCase().includes(store.bairroSearch.toLocaleLowerCase()))" :key="indexB"                                             
              @click="store.recursos.openBairros = false;
                      store.bairroUpdateCreate.optionSelect={bairro: b.bairro, idbairro: b.id_bairro, cdproduto: b.cdproduto, valorentrega: b.valorentrega}"
              >              
              <a style="width: 90%;">{{b.bairro}} </a>
              
          </div>  
        </div>
     
     
        
                
      
        </div>   

    
         
    </div>    
  </div>

 
  <div style="padding-bottom: 15px;" >
    
    Cidade: *    
 
      <div v-if="store.bairroUpdateCreate.validation.cidade && store.bairroUpdateCreate.cidade.length < 1" 
      style="color: red; font-size: 20px;
      background-color: white;
      width: 100%;
      height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;
      ">
      CIDADE É OBRIGATÓRIA! *
    </div>
    


    <div>
      <input style="width: 100%; height: 40px; border-radius: 5px;" 
              type="text"
              v-model="store.bairroUpdateCreate.cidade"
              placeholder="Preencha a Cidade"
              >
    </div>
  </div>

 
  <div style="padding-bottom: 15px;" >
    Endereço (Rua. AV):*
  
    <div v-if="store.bairroUpdateCreate.validation.logradouro && store.bairroUpdateCreate.logradouro.length < 1" 
      style="color: red; font-size: 20px;
      background-color: white;
      width: 100%;
      height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;
      ">
      ENDEREÇO É OBRIGATÓRIO! *
    </div>


    <div style="padding-bottom: 15px;" >
      <input style="width: 100%; height: 40px; border-radius: 5px;" 
              type="text"
              v-model="store.bairroUpdateCreate.logradouro"
              placeholder="Preencha o Endereço"
              >
    </div>
  </div>

 
  <div style="padding-bottom: 15px;" >
    Numero: *
 
  <div v-if="store.bairroUpdateCreate.validation.nrendereco && store.bairroUpdateCreate.nrendereco.length < 1" 
      style="color: red; font-size: 20px;
      background-color: white;
      width: 100%;
      height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;
      ">
      NUMERO É OBRIGATÓRIO! *
    </div>

    <div>      
      <input style="width: 100%; height: 40px; border-radius: 5px;" 
              type="text"
              v-model="store.bairroUpdateCreate.nrendereco"
              placeholder="Preencha o Numero"
              >
    </div>
  </div>

 
  <div>
 
    <div style="padding-bottom: 15px;" >
    Complemento, Ponto de Referência, N. Apto
    
 

      <div v-if="store.bairroUpdateCreate.validation.complemento && store.bairroUpdateCreate.complemento.length < 1" 
      style="color: red; font-size: 20px;
      background-color: white;
      width: 100%;
      height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;
      ">
      COMPLEMENTO É OBRIGATÓRIO! *
    </div>
    

    <div>
      <input style="width: 100%; height: 40px; border-radius: 5px;" 
              type="text"
              v-model="store.bairroUpdateCreate.complemento"
              placeholder="Preencha o Complemento"
              >
    </div>
  </div>
    
  </div>

      
  </div>

  <div style="color: white;              
              padding: 15px; 
              width: 100%;     
              bottom: 1;                         
              font-size: 11px;
              text-align: center;
  "  >
    Ao informar meus dados, eu concordo com os Termos de Uso e Politica de Privacidade
  </div>
 
   <!--Button Avançar-->
 <div class="" style="position: fixed; 
                         width: 100%;
                         bottom: 0;
                         
                         ">

   <div style="display: flex; justify-content: center; padding: 6px; margin: 0px 7px 5px 7px;">
 

     <button
              type="button" 
              class="btn btn-success btn-lg btn3d"
              style="width: 100%;     
                margin: 0px 0px 0px 0px;       
              "    
			    @click="validacaoEndereco()"
              >
              <span class="glyphicon glyphicon-ok"></span> 
              > Avançar
        </button>

     </div>  
   <!--Botoes-->   

    </div>
 
       <!--Fim Button Avançar-->     

 

</template>

<script setup>
import Bairros from './Bairros.vue'
import axios from 'axios'
import {indexStore} from '../../../stores/index'  
const store = indexStore();



const handleInput = (vlrInput)=> {
  console.log('digitou no input')
 
  
}
 


const  cadastroUpdateEndereco = ()=> {

  console.log('BAIRRO SELECIONADO É: '+ store.bairroUpdateCreate.optionSelect.idbairro)
  console.log(store.bairroUpdateCreate)
    
  if (store.bairroUpdateCreate.atualizar == true) {
   //codigo update de endereço   
   console.log('codigo do cliente na atualização do endereço' + store.cliente.cdcliente +'  +  '+ store.bairroUpdateCreate.cdcliente_end)
   var data = JSON.stringify({
              "databasecliente":store.recursos.databasecliente,
              "idbairro":       store.bairroUpdateCreate.optionSelect.idbairro,
              "bairro":         store.bairroUpdateCreate.optionSelect.bairro,
              "cdcliente":      store.cliente.cdcliente,
              "cdcliente_end":  store.bairroUpdateCreate.cdcliente_end,
              "cep":            store.bairroUpdateCreate.cep,
              "cidade":         store.bairroUpdateCreate.cidade,
              "complemento":    store.bairroUpdateCreate.complemento,
              "logradouro":     store.bairroUpdateCreate.logradouro,
              "nrendereco":     store.bairroUpdateCreate.nrendereco 
            });

var config = {
  method: 'put',
  url: 'https://easypedidos.sytes.net:8082/evento/setdadosclienteendereco',
  headers: { 
    'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  //store.bairroUpdateCreate.cdcliente_end=response.data.cdcliente_end
  console.log('UPDATE Endereçoo: '+store.bairroUpdateCreate.cdcliente_end)
  store.pedido.pedido.cdendereco=store.bairroUpdateCreate.cdcliente_end 
 

  store.cliente.enderecos =[{
                  bairro: store.bairroUpdateCreate.optionSelect.bairro,
                  cdcliente_end: response.data.cdcliente_end,
                  cdmunicipio: 0,
                  cdproduto: store.bairroUpdateCreate.optionSelect.cdproduto,
                  cep: store.bairroUpdateCreate.cep,
                  cidade: store.bairroUpdateCreate.cidade,
                  complementoendereco: store.bairroUpdateCreate.complemento,
                  idbairro: store.bairroUpdateCreate.optionSelect.idbairro,
                  logradouro: store.bairroUpdateCreate.logradouro,
                  nomemunicipio: store.bairroUpdateCreate.cidade,
                  nrendereco: store.bairroUpdateCreate.nrendereco,
                  pontoreferencia: "",
                  valorentrega: store.bairroUpdateCreate.optionSelect.valorentrega
              }]
              
  console.log('*******/******11111*******/***********/')            
  console.log(store.cliente.enderecos)
  store.selectItem.indexEndereco=0
  store.pedido.pedido.valorpedido       = store.pedido.pedido.valorpedido + store.bairroUpdateCreate.optionSelect.valorentrega
  store.pedido.pedido.cdtaxaentrega     = store.bairroUpdateCreate.optionSelect.cdproduto
  store.pedido.pedido.taxaentrega       = store.bairroUpdateCreate.optionSelect.valorentrega
  totalPedido()
  console.log(store.bairroUpdateCreate.optionSelect)
})
.catch(function (error) {
  console.log(error);
});    
    store.recursos.etapaPedido=99;
    store.recursos.telaAtualNome='FINALIZAR PEDIDO'
    store.recursos.telaContentAtual='FINALIZAR'
   
  }else {
    //codigo create endereço
    var data = JSON.stringify({
      "databasecliente": store.recursos.databasecliente,
      "idbairro":        store.bairroUpdateCreate.optionSelect.idbairro,
      "bairro":          store.bairroUpdateCreate.optionSelect.bairro,
      "cdcliente":       store.cliente.cdcliente,      
      "cep":             store.bairroUpdateCreate.cep,
      "cidade":          store.bairroUpdateCreate.cidade,
      "complemento":     store.bairroUpdateCreate.complemento,
      "logradouro":      store.bairroUpdateCreate.logradouro,
      "nrendereco":      store.bairroUpdateCreate.nrendereco
    });
    


    var config = {
      method: 'post',
      url: 'https://easypedidos.sytes.net:8082/evento/setdadosclienteendereco',
      headers: { 
        'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      store.bairroUpdateCreate.cdcliente_end=response.data.cdcliente_end
      console.log('Novo Endereço Cadastrado: '+store.bairroUpdateCreate.cdcliente_end)
      store.pedido.pedido.cdendereco=store.bairroUpdateCreate.cdcliente_end
      store.selectItem.cdcliente_end=store.bairroUpdateCreate.cdcliente_end
      store.selectItem.indexEndereco=0
      

      store.cliente.enderecos =[{
                  bairro: store.bairroUpdateCreate.optionSelect.bairro,
                  cdcliente_end: response.data.cdcliente_end,
                  cdmunicipio: 0,
                  cdproduto: store.bairroUpdateCreate.optionSelect.cdproduto,
                  cep: store.bairroUpdateCreate.cep,
                  cidade: store.bairroUpdateCreate.cidade,
                  complementoendereco: store.bairroUpdateCreate.complemento,                  
                  idbairro: store.bairroUpdateCreate.optionSelect.idbairro,
                  logradouro: store.bairroUpdateCreate.logradouro,
                  nomemunicipio: store.bairroUpdateCreate.cidade,
                  nrendereco: store.bairroUpdateCreate.nrendereco,
                  pontoreferencia: "",
                  valorentrega: store.bairroUpdateCreate.optionSelect.valorentrega
              }]

               
  console.log('*******/****222222*********/***********/')            
  console.log(store.cliente.enderecos)
  store.pedido.pedido.valorpedido       = store.pedido.pedido.valorpedido + store.bairroUpdateCreate.optionSelect.valorentrega
  store.pedido.pedido.cdtaxaentrega     = store.bairroUpdateCreate.optionSelect.cdproduto
  store.pedido.pedido.taxaentrega       = store.bairroUpdateCreate.optionSelect.valorentrega
  
  
  totalPedido()
  
      
    })
    .catch(function (error) {
      console.log(error);
    });

    store.recursos.etapaPedido=99;
    store.recursos.telaAtualNome='FINALIZAR PEDIDO'
    store.recursos.telaContentAtual='FINALIZAR'
    
  }
  
}

 
function totalPedido ()  {

/** somatoria de Todos os adicionais */
  const ArrayProv = []
  var pitem = store.pedido.pedido?.pedidoitem?.map(a => {    
    
    var t = a.adicionais?.filter(f => f.isadicionalprod == 's')
      
    var x = t?.map(i => {return i.valortotal}) || 0    
    //console.log(x)
    var soma = 0;
      for(var i = 0; i < x.length; i++) {
          soma += x[i];
      }      
      ArrayProv.push(soma)    
     
  })

  
  var totalAdicionais = 0;
  for(var i = 0; i < ArrayProv.length; i++) {
    totalAdicionais += ArrayProv[i];
  }
/** fim somatoria de Todos os adicionais */
 

      var somarPizza = store.pedido.pedido.pedidoitem.map(pedidoitem => {
      return (pedidoitem.valorunitario * pedidoitem.quantidade) // + somaAdic      
      }) 
      let totalpizzas = 0
      for(let i in somarPizza) {
        totalpizzas += somarPizza[i] 
      }
       
      store.pedido.pedido.valorpedido =  totalpizzas +totalAdicionais+ store.pedido.pedido.taxaentrega
  
} 
 
function validacaoEndereco () {
  console.log('validando campos') 

  
if ( !store.bairroUpdateCreate.cidade == 0
 // && !store.bairroUpdateCreate.complemento == 0
  && !store.bairroUpdateCreate.logradouro == 0
  && !store.bairroUpdateCreate.nrendereco == 0
  && store.bairroUpdateCreate.validation.optionSelect == false
  ) {     
    console.log('validado')
    cadastroUpdateEndereco()
  } else{  
 
   if(store.bairroUpdateCreate.cidade.length == 0){
      store.bairroUpdateCreate.validation.cidade = true  
   }else{
      store.bairroUpdateCreate.validation.cidade = false
   }

   if(store.bairroUpdateCreate.complemento.length == 0){
    //desativado dia 18/11/2022 a pedido do leonardo pelo whats
     //store.bairroUpdateCreate.validation.complemento = false 
   }else{
    store.bairroUpdateCreate.validation.complemento = false 
   }

   if (store.bairroUpdateCreate.logradouro.length == 0) {
    store.bairroUpdateCreate.validation.logradouro = true 
   }else{
    store.bairroUpdateCreate.validation.logradouro = false
   }
  if (store.bairroUpdateCreate.nrendereco.length == 0 ) {
      store.bairroUpdateCreate.validation.nrendereco = true 
    }else{
      store.bairroUpdateCreate.validation.nrendereco = false
    } 
    if (store.bairroUpdateCreate.optionSelect?.idbairro >= 0
     ) {
      store.bairroUpdateCreate.validation.optionSelect = false 
    }else{
      store.bairroUpdateCreate.validation.optionSelect = true
    }
  
}}

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
  
}

a:hover {
  background-color: #628ed1;
}
</style>