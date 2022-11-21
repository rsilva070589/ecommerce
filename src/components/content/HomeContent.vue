<template>
  <div  style="margin-top: 38px;">
  </div>


  <div 
        v-if="store.recursos.etapaPedido == 3">
   <Carrinho />
  </div>
  
  <Produtos v-if="store.recursos.telaContentAtual=='PRODUTOS'"/> 
  <SelectProduto v-if="store.recursos.telaContentAtual=='SELECTPRODUTO'"/> 

  <div 
        v-if="store.recursos.etapaPedido == 1 
           && store.pizzaSelecao.length >= store.selectItem.qtdemax     
           && store.pizzaSelecao.length > 0
           //&& store.recursos.telaContentAtual  
           "
        style="display: flex;
        justify-content: center;              
  ">

    <ButtonAvancar v-if="!store.dadosEmpresa.ecommerce" style="position: fixed;"/>
    <ButtonAvancar v-if="store.dadosEmpresa.ecommerce && store.selectItem.montagemrequerida" style="position: fixed;"/>
                
  </div>

  <GrupoProdutos v-if="store.recursos.telaContentAtual=='GRUPOPRODUTOS'"/>
  

 <div   v-if="store.recursos.telaContentAtual!='GRUPOPRODUTOS' &&
              store.recursos.telaContentAtual!='PRODUTOS' &&              
              store.recursos.telaContentAtual!='PRODUTOS2' &&
              store.recursos.telaContentAtual!='STATUSPEDIDO' &&
              store.recursos.telaContentAtual!='LISTAPEDIDO' &&
              store.recursos.telaContentAtual!='MINHACONTA' &&
              store.recursos.telaContentAtual!='AREAENTREGA' &&
              store.recursos.telaContentAtual!='SELECTPRODUTO'
              
             "
       style="  
              height: 94vh;    
              width: 100%;              
              background-size: 150% 100vh; 
              background-position: center;
              background-repeat: no-repeat;   
              
              "              
              v-bind:style="{ 'background-image': 'url(' + store.dadosEmpresa.dadosloja?.img_background + ')' }"
              >
  <DadosEmpresa v-if="store.recursos.telaContentAtual=='DADOSEMPRESA'"/>

  <div style="padding: 0px;">
    <TipoRetirada v-if="store.recursos.telaContentAtual=='TIPORETIRADA'"/>
  </div>

  <div v-if="store.recursos.telaContentAtual=='CADASTRO'">    
    <Cadastro />
  </div>
  <div v-if="store.recursos.telaContentAtual=='ENDERECO'">    
    <Endereco />
  </div>
  <div v-if="store.recursos.telaContentAtual=='FINALIZAR'">
    <Finalizar />    
  </div>
   
</div>

<div v-if="store.recursos.telaContentAtual=='STATUSPEDIDO'">
    <StatusPedido />    
  </div>

  <div v-if="store.recursos.telaContentAtual=='LISTAPEDIDO'">
    <ListaPedidos />    
  </div>

  <div v-if="store.recursos.telaContentAtual=='MINHACONTA'">
    <MinhaConta />    
  </div>

  <div v-if="store.recursos.telaContentAtual=='AREAENTREGA'">
    <AreaEntrega />    
  </div>
 

</template>

<script setup>
import SelectProduto from '../meuspedidos/SelectProduto.vue';
import {ref}          from 'vue';
import AreaEntrega from '../meuspedidos/pospedido/AreaEntrega.vue';
import MinhaConta from '../meuspedidos/pospedido/MinhaConta.vue';
import ListaPedidos from '../meuspedidos/pospedido/ListaPedidos.vue';
import Endereco from '../meuspedidos/pospedido/Endereco.vue'
import Cadastro from '../meuspedidos/pospedido/Cadastro.vue';
import Finalizar from '../meuspedidos/pospedido/Finalizar.vue';
import StatusPedido from '../meuspedidos/pospedido/PedidoDetalheFinal.vue';
import Carrinho from '../meuspedidos/Carrinho.vue';
import ButtonAvancar  from '../meuspedidos/ButtonAvancar.vue'
import ButtonAvancarCarrinho from '../meuspedidos/ButtonAvancarCarrinho.vue'
import Produtos       from      '../meuspedidos/Produtos.vue'; 
import GrupoProdutos  from '../meuspedidos/GrupoProdutos.vue';
import DadosEmpresa   from  './DadosEmpresa.vue';
import TipoRetirada   from  '../meuspedidos/TipoRetirada.vue'
import axios          from 'axios';
import {indexStore}   from  '../../stores/index'
import dadosProdutos  from '../../data/dadosProdutos.json'
 
const store = indexStore(); 

store.grupoProdutos=dadosProdutos.dados.grupos; 
store.dadosProdutos=dadosProdutos;

//store.recursos.carregando = true
//console.log(store.grupoProdutos )


const getAmbiente = () => {
    if (document.domain.split(".")[0] == 'localhost' && document.domain.split(".")[0] == 'ecommerce-img') {
      store.recursos.dominio='suapizzaria'
    }else{
      store.recursos.dominio=document.domain.split(".")[0]
    }
    console.log('subdominio: ' + store.recursos.dominio)
}

getAmbiente()


const getIp = async () => {
  

    var config = {
      method: 'get',
      url: 'https://api.ipify.org?format=json',
      headers: { },
      data : ''
    };

    axios(config)
    .then(function (response) {
      store.recursos.ip = response.data.ip
      console.log('ip do cliente é: '+store.recursos.ip)
      getLogin()
    })
    .catch(function (error) {
      console.log(error);
    });

}


 



const getEmpresa = ()=> { 
var data = JSON.stringify({
  "identificadorurl": store.recursos.dominio 
});

var config = {
  method: 'post',
  url: 'https://easypedidos.sytes.net:8082/evento/getdadosempresasite',
  headers: { 
    'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) { 
  store.dadosEmpresa = response.data
  store.recursos.databasecliente = response.data.dadosloja.databasecliente
  console.log(store.dadosEmpresa) 
  //getProdutos()
  getFormaPgto()
  getBairros() 
  getIp()  
})
.catch(function (error) {
  console.log(error);
});

}
getEmpresa()

const  getLogin = ()=> {
 
var data = JSON.stringify({
  "databasecliente": store.recursos.databasecliente,
    "dadosurl": window.history.state.current.replace('/',""),
    "ip": store.recursos.ip
});

var config = {
  method: 'post',
  url: 'https://easypedidos.sytes.net:8082/evento/getdadosreqinicial',
  headers: { 
    'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  
  if( response.data.sucess == 'true') {
    store.cliente=response.data.dadoscliente
  }
    console.log(store.cliente)
    store.selectItem.cdcliente_end= store.cliente.enderecos[0]?.cdcliente_end || 0
    store.selectItem.taxaentrega=store.cliente.enderecos[0]?.valorentrega || 0
  
})
.catch(function (error) {
  console.log(error);
});


}


const getFormaPgto = ()=> {

var data = JSON.stringify({
  "databasecliente": store.recursos.databasecliente,
  "typetable": 3
});

var config = {
  method: 'post',
  url: 'https://easypedidos.sytes.net:8082/evento/getdadostable',
  headers: { 
    'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {   
  store.formaspgto = response.data.dados
  console.log(store.formaspgto)
  
})
.catch(function (error) {
  console.log(error);
 
});

} 


const getBairros = ()=> {
  
  var data = JSON.stringify({
    "databasecliente": store.recursos.databasecliente,
  "typetable": 2
});

var config = {
  method: 'post',
  url: 'https://easypedidos.sytes.net:8082/evento/getdadostable',
  headers: { 
    'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log()
  store.bairros = response.data.dados
  
})
.catch(function (error) {
  console.log(error);
 
});

}


const getProdutos = ()=> {
  var data = JSON.stringify({
  "databasecliente": store.recursos.databasecliente,
  "typetable": 1
});

var config = {
  method: 'post',
  url: 'https://easypedidos.sytes.net:8082/evento/getdadostable',
  headers: { 
    'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  //console.log(response.data)
  store.grupoProdutos=response.data.dados.grupos
  store.dadosProdutos=response.data
  //store.grupoProdutos = dadosProdutos.dados.grupos;
  console.log(store.dadosProdutos)
  setProdutos()
  store.recursos.carregando = false
})
.catch(function (error) {
  console.log(error);
  store.recursos.carregando = false
});

}


const setProdutos = () => {

  console.log(store.dadosProdutos.dados.grupos)
  const grupoSemMontagem = g => g.montagemrequerida == false
  const pizza1  = store.dadosProdutos.dados.grupos.filter(grupoSemMontagem)

  console.log(pizza1)
  pizza1.forEach(element => {
    element.produto.forEach( element => {     
      store.produtos.push(element) 
    
    })
  })
 



const esabor = g => g.esabor == true 
const grupoComMontagem = g => g.montagemrequerida == true
const pizza2  = store.dadosProdutos.dados.grupos.filter(grupoComMontagem)

pizza2.forEach(element => {
 element.produto.forEach(dados => {
  const temp = dados.adicionaisproduto.filter(esabor) 
   temp.forEach(t => {
     t.adicionaisitensproduto.forEach(p => {
      var obj = {
        adicionaisproduto: dados.adicionaisproduto.filter(g => g.esabor == false),
        cdgrupo: element.cdgrupo,
        cdproduto:  p.cdproduto,
        descricao: p.descricaoproduto,
        ingredientes: p.ingredientes,
        ingredientesproduto: p.ingredientesproduto,
        observacao: p.observacao,
        precofinalvenda: p.precofinalvenda,
        requeradicional: p.requeradicional,
        valordescontovenda: p.valordescontovenda
      }     
      store.produtos.push(obj) 
       
     }) 
    

   })           
  
}) 
 
})

}

setProdutos() 

</script>

<style>
.center {
  display:  flex; 
           justify-content: center;
           padding: 10px; 
           filter: brightness(100%);
}
</style>