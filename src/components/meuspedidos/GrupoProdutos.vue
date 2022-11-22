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
      @click="selectGrupo(i.cdgrupo,  i.nomegrupo, i.montagemrequerida, i.requeropcional, i.qtdemax, i.qtdemin)"
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

 
const selectGrupo = (codGrupo,   nomegrupo,  montagemrequerida, requeropcional, qtdemax, qtdemin)=>{
      if (codGrupo==1){store.selectItem.urlprincipal='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Zyu-T5WQ7bLxROPZPWo7u65WqNKpnk7NWQ&usqp=CAU'}
      if (codGrupo==2){store.selectItem.urlprincipal='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4Zyu-T5WQ7bLxROPZPWo7u65WqNKpnk7NWQ&usqp=CAU'}
      if (codGrupo==3){store.selectItem.urlprincipal='https://bolodamadre.com.br/wp-content/uploads/2020/05/refrigerante-1.jpg'}

    store.recursos.telaContentAtual='PRODUTOS'
    store.recursos.telaAtualNome=nomegrupo
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