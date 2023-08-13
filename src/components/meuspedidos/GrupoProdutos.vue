<template> 
 
 
  <div   v-if="!store.recursos.carregando"
  style="color: white;
              background-color: black;                        
              height: 95vh;  
              background-size: 100% 94vh;  
              width: 100%;  
              margin-top: 50px;     
              
  ">
  
   
    <div 
      @click="selectGrupo(i.cdgrupo,  i.nomegrupomenu,i.orientacaogrupo, i.montagemrequerida, i.requeropcional, i.qtdemax, i.qtdemin)"
      class="card"
      style="    
             background-color: dimgray; 
             border-radius: 0px; 
             " 
      v-for="i in store.grupoProdutos" :key="i.cdgrupo"
      >                                               
      <div        
        style="background-size: 100% 175px; font-size: 30px; font-weight: bold"        
        v-bind:style="{ 'background-image': 'url(' + i.img_grupo + ')' }"
      >
        
         <div style="text-align: center; 
                  margin: 10px 25px 20px 25px; 
                  height: 130px;
                  font-size: 32px; font-family: Lato; text-align: center; padding-top: 10px;
                  ">
           {{i.nomegrupo}} 
        <br>
          <div style="font-size: 20px; 
                      text-align: center; 
                      padding-top: 0px; 
                      font-family: lato; opacity: .9;">
            {{i.descricaogrupo}}
          </div>
        
        </div>  
      </div>  
  </div>
  </div> 
  
  <Carregando />
  
  </template>

<script setup>
 import Carregando from '../content/Carregando.vue';
import {indexStore} from '../../stores/index'  
const store = indexStore(); 
store.dadosEmpresa.ecommerce =true 

 
const selectGrupo = (codGrupo,   nomegrupomenu,  orientacaogrupo,montagemrequerida, requeropcional, qtdemax, qtdemin)=>{
      console.log(orientacaogrupo)
    store.recursos.telaContentAtual='PRODUTOS'
    store.recursos.telaAtualNome=nomegrupomenu
    store.selectItem.codGrupo=codGrupo 
    store.recursos.etapaPedido=1  
    store.selectItem.qtdemax=qtdemax
    store.selectItem.qtdemin=qtdemin
    store.selectItem.montagemrequerida=montagemrequerida
    store.selectItem.requeropcional=requeropcional
    novoPedido()  
}
 

const novoPedido = ()=> {
     store.pizzaSelecao=[];
     store.adicionalSelecao =[];
     store.ingredientesSelecao = [];
     store.ingredientesProduto = [];
     store.adicionaisItensProduto = [];
}

</script>

<style>

</style>