<template>
    <div  
    v-if="store.recursos.telaAtualNome!='CARRINHO'"
    style="width: 100%; margin-top: 49px ">

      <div href="#" class="flex flex-col   
              shadow-md md:flex md:max-w-xl  
               ">    
          
          <div v-if="store.itemSelect.imagens?.length > 0">
          
               <Carousel>
                <Slide v-for="slide in store.itemSelect.imagens" :key="slide"
                style="position: re;"
                >
                  <div class="carousel__item">
                    <img style="
                            width: 100%; height: 250px;  
                            position: static;" 
                     :src="slide?.url" alt=""> 
                  </div>
               
                </Slide>

                <template #addons>
 
                  <Pagination style="    
                    display: inline-flex;
                    margin-left: -60px;
                    margin-top: -40px;  
                    position: absolute;  
                    "
                    />
                 </template>
                
              </Carousel>

                
 
                
          </div>

   
          
               

          <div style="padding: 10px; display: flex; 
                    justify-content: space-between;
                    font-size: 20px;
                    ">
            <span style="color: black; margin: 0px 0px 0px 0px;">
              {{store.itemSelect.descricao}} 
             </span>

             <span class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> R$ {{formataDinheiro(store.itemSelect.precofinalvenda,2)}}</span>
               
          </div>
        </div> 


<div style="margin: 0px 0px 15px 0px;">
  <AdicionaisProduto/>  
      <Ingredientes/> 
  
</div>


<div style="bottom: 0; position: fixed; width: 100%;">
  <button type="button" 
  class="btn btn-success btn-lg btn3d"
              style="width: 96%; margin: 5px;;
      
              "            
        @click="selectProduto(store.itemSelect.cdproduto, 
                                              store.itemSelect.precofinalvenda, 
                                              store.itemSelect.descricao)"      
              >
          <span class="glyphicon glyphicon-remove"></span>
   <!-- item add e remove-->  
      
        <div style="display: flex; 
                          justify-content: space-between;                  
                          ">

                    <!-- fim add e remove-->

                    <div 
                                              
                          style="  width: 50%; height: 30px;"
                                              >
                      Adicionar
                    </div>
          

          <div style="font-size: 20px; color: white;" @click="selectProduto(store.itemSelect.cdproduto, 
                                                                              store.itemSelect.precofinalvenda, 
                                                                              store.itemSelect.descricao)">
           
              R$ {{store.formataDinheiro(store.somar(),2)}} 
        
          </div> 
        </div>

      </button>

</div> 
        
    </div>

</template>

   
<script setup>
 
 import IconSwitchOn from '../icons/IconSwitchOn.vue'
 import IconSwitchOff from '../icons/IconSwitchOff.vue'
 import Ingredientes from './Ingredientes.vue'
 import AdicionaisProduto from './AdicionaisProduto.vue';
 import axios from 'axios';
 import {indexStore} from '../../stores/index'  
 import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
 import 'vue3-carousel/dist/carousel.css'
 import './css/carousel.css'
 const store = indexStore();

 store.dadosEmpresa.ecommerce=true 

 store.indexImagem = 0 
 
 
console.log('cod do grupo para filtro de produtos :' + store.selectItem.codGrupo)
 
   
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
   
   const selectProduto = (cdproduto, precofinalvenda, descricao,urlprincipal) => {   
    store.pizzaSelecao[0].adicionais=store.adicionalSelecao
    store.pizzaSelecao[0].ingredientes=store.ingredientesSelecao 
    store.pizzaSelecao[0].imagens=store.itemSelect.imagens

        console.log('add o item:  '+cdproduto + ' ' + descricao)   

                 store.pizzaSelecao.forEach(dados => {                
                                    store.pedido.pedido.pedidoitem.push(dados)
                                })
   
     store.recursos.etapaPedido=3
     store.recursos.telaContentAtual ='PRODUTOS';
    store.recursos.telaAtualNome='CARRINHO'  
    store.recursos.alertaCarrinho=false
    store.itemSelect.qtde=1 
    store.pizzaSelecao=[];

          
  
   }

   
    
  const proximaImagem = ()=> {
   
    if (store.indexImagem < store.itemSelect.imagens.length -1) {
      store.indexImagem = store.indexImagem +1
      console.log('index da imagem: '+store.indexImagem)
    }
    
  }

  const imagemAnterior = ()=> {
   
   if (store.indexImagem > 0) {
     store.indexImagem = store.indexImagem -1
     console.log('index da imagem: '+store.indexImagem)
   }
   
 }
 
   
   </script>
   
   <style>
   .carousel__item {
     min-height: 200px;
     width: 100%;
     background-color: var(--vc-clr-primary);
     color: var(--vc-clr-white);
     font-size: 20px;  
   }
   
   .carousel__slide {
     padding: 0px;
   }
   
   .carousel__prev,
   .carousel__next {
     box-sizing: content-box; 
   }
   </style>
