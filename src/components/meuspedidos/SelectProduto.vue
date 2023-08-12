<template>
    <div  style="width: 100%; margin-top: 49px ">

      <div href="#" class="flex flex-col  bg-white rounded-lg border shadow-md md:flex md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    
          
          <div style="">
          
               <Carousel>
                <Slide v-for="slide in store.itemSelect.imagens" :key="slide">
                  <div class="carousel__item">
                    <img style="
                            width: 100%; height: 250px; 
                            display: flex;
                            margin-left: auto;
                            margin-right: auto;"
               :src="slide?.url" alt=""> 
              </div>
       
                </Slide>

                
                <template #addons>
                  <Pagination style="margin-top: -10px; margin-left: -30px;"/>
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
        
        console.log('add o item:  '+cdproduto + ' ' + descricao)  
       /**      
        store.pizzaSelecao.push(          
                {
                'cdproduto': cdproduto,
                'descricao': descricao,
                'observacao': 'observacao teste componente Produtos',
                'isadicionalprod': 'n',
                'valorunitario': precofinalvenda,
                'quantidade': store.itemSelect.qtde,
                'valortotal': precofinalvenda * store.itemSelect.qtde
                }
            )
      */
          //  console.log('valor select : ' +listaAtualProd[index].select)
            // console.log(store.pizzaSelecao) 
 
       // store.pizzaSelecao[0].adicionais=store.adicionalSelecao
       // store.pizzaSelecao[0].ingredientes=store.ingredientesSelecao
         

                 store.pizzaSelecao.forEach(dados => {                
                                    store.pedido.pedido.pedidoitem.push(dados)
                                })
   

            store.recursos.telaContentAtual ='PRODUTOS';
            store.recursos.telaAtualNome    ='CATALAGO';
            store.itemSelect.qtde=1 
            novoPedido()
  
   }

   const novoPedido = ()=> {      
     store.pizzaSelecao=[];
     store.adicionalSelecao =[];
     store.ingredientesSelecao = [];
     store.ingredientesProduto = [];
     store.adicionaisItensProduto = [];
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
     border-radius: 8px;
     display: flex;
     justify-content: center;
     align-items: center;
   }
   
   .carousel__slide {
     padding: 0px;
   }
   
   .carousel__prev,
   .carousel__next {
     box-sizing: content-box;
     border: 0px solid white;
   }
   </style>
