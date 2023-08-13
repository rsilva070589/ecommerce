<template>   

  <!-- s/ imagem-->
  <div v-if="!store.dadosEmpresa.dadosloja.statususaimgproduto">
    <ProdutosLista />
  </div>
  
  <div v-if="store.dadosEmpresa.dadosloja.statususaimgproduto && store.selectItem.montagemrequerida">
    <ProdutosLista />
  </div>
  <!-- s/ imagem-->
   
  <!--Diversos Imagem--> 
    <div v-if="store.dadosEmpresa.dadosloja.statususaimgproduto && !store.selectItem.montagemrequerida"> 
    <div :class="(store.pizzaSelecao.length > 0) ? ['fundoSelect'] : ['']"> 
  
     <div class="conteudo" v-if="store.recursos.etapaPedido==1"
                 style="color: white;               
                 height: 85vh;  
                 margin-top: 8px;               
                 padding: 12px 0{{i.descricao}}{{i.descricaoproduto}}  px 0px 0px;
                 background-size: 100% 94vh;               
                 width: 100%; 
                  
     ">
     
     <div style="margin-top: 10px; padding: 10px; background-color: dimgray; font-size: 20px; 
                
     ">
        <i class="bi bi-chevron-down"></i>
       CATÁLOGO
     </div>   
     
     <div :class="!(store.pizzaSelecao.length >= store.selectItem.qtdemax && store.selectItem.qtdemax > 0) ? ['classeEnable'] : ['classeDisable']"
     >
   
     <div      
     
         class=""
         style=" 
                color: black;        
                margin: 0px 0px 4px 0px;  
                border-top: 1px solid whitesmoke;
                border-bottom: 1px solid wheat;
         "       
         v-for=" (i, index) in store.listaAtualProd" :key="i.cdproduto"       
         @click="onDetalheProduto(i.cdproduto,i.imagens,i.precofinalvenda,i.descricao,i.detalhes, index);
              store.selecaoProduto(i.cdproduto,i.precofinalvenda,i.descricao,index, store.selectItem.qtdemax,i.images)
         " 
         >  
         <div 
                    style="display: flex;
                   ">
            
            <div v-if="i.imagens">
              <img style="width: 130px;
                          height: 110px;
                          " 
                  :src="i.imagens[0]?.url" alt="">
            </div>
           <div style="padding:  5px;
                       width:  210px;
                       height: 110px;" >               
               {{i.descricao}}{{i.descricaoproduto}}               
            
               <span style="font-size: 13px;
                            padding: 0;
                      ">
                      <div v-if=" i.ingredientes">
                        {{i.ingredientes}}
                      </div>              
               </span> 
    
              <div>
                
                 <span style="color: deepskyblue; border: 0;"> 
                   R$  {{store.formataDinheiro( i.precofinalvenda, 2) }}                
                 </span> 
               
              </div> 
         </div> 
      </div>  
     
     </div>  
    </div>
     </div>
     </div>  
  
      
    <div v-if="store.recursos.etapaPedido==2" class="">
      <div class="conteudo"
          style="
          margin-top: 0px;
          height: 90vh;
          padding: 5px 0px 0px 0px;
          "
           
      > 
      <AdicionaisProduto/>  
         <Ingredientes/> 
         
      </div>
    </div> 
  </div> 
      <!--Diversos Imagem--> 
  
     <!-- BOTTTON-->
     <div 
     v-if="store.dadosEmpresa.ecommerce 
              && store.recursos.telaContentAtual=='PRODUTOS'
              && store.recursos.etapaPedido==1
              && store.selectItem.montagemrequerida ==0
              && store.pedido.pedido.pedidoitem.length > 0
              "
     
          class="" style="position: fixed; 
                             width: 100%;
                             bottom: 0; 
                             "
                 @click="store.recursos.etapaPedido=3 ;
         store.recursos.alertaCarrinho=false
         store.recursos.telaContentAtual='PRODUTOS';
         store.recursos.telaAtualNome='CARRINHO'"            
                             >
    
       <div style="display: flex; justify-content: center; padding: 3px; margin: 0px 7px 5px 7px;">
        <button
                  type="button" 
                  class="btn btn-success btn-lg btn3d"
                  style="width: 100%;     
                    margin: 0px 0px 0px 0px;       
                  "    
             
                  >
              <span class="glyphicon glyphicon-ok"></span> 
    
              <i style="position: fixed;
                  margin: -2px 0px 0px -32px;
                  
        " class="bi bi-cart-fill"></i>
        <span style="margin: -7px -5px 0px -20px; 
                    padding: 6px;
                    width: 20px;
                    height: 20px;
                    background-color: red;
                    border-radius: 50%;
                    font-size: 14px;
                    position: fixed;
              ">
          
              <span v-if="!store.pedido.pedido" style="position: fixed; margin: -0px 0px 0px 0px; font-weight: bold;">
                0
              </span>
              <span style="position: fixed; margin: -6px 0px 0px -4px; font-weight: bold;">
                {{store.pedido.pedido?.pedidoitem.length}}  
              </span> 
          
        </span>
    
                  FECHAR PEDIDO
            </button>
         </div> 
     </div> 
            <!--fim BOTTTON-->
      
  
   
   </template>
     
  <script setup>
   
   import IconSwitchOn from '../icons/IconSwitchOn.vue'
   import IconSwitchOff from '../icons/IconSwitchOff.vue'
   import Ingredientes from './Ingredientes.vue'
   import AdicionaisProduto from './AdicionaisProduto.vue';
   
   import ProdutosLista from './ProdutosLista.vue';
  
   import {indexStore} from '../../stores/index'  
   const store = indexStore();
    
  
  const grupo = g => g.cdgrupo == store.selectItem.codGrupo
  const listaAtualProd =  store.produtos.filter(grupo)  
  
  store.listaAtualProd = listaAtualProd

  store.pizzaSelecao=[];
            store.adicionalSelecao =[];
            store.ingredientesSelecao = [];
            store.ingredientesProduto = [];
            store.adicionaisItensProduto = [];
  
  
  store.listaAtualProd.map(i => {
    i.select = null
  })
  
  store.listaAtualProd.forEach(a => {
        a.ingredientesproduto.forEach( b=>{ 
            var ingrediente = {
                nome: a.descricao,
                cdproduto: a.cdproduto,
                cdingrediente: b.cdingrediente, 
                eobrigatorio: b.eobrigatorio, 
                ingrediente: b.ingrediente
            }
            store.ingredientesProduto.push(ingrediente)
        }  
        ) 
     })
  
     
     store.listaAtualProd.forEach(a => { 
      store.adicionaisProduto=a.adicionaisproduto
       a.adicionaisproduto.forEach( b=> { 
         const adc  = {
              cdproduto: a.cdproduto,
              adicionaisitensproduto: b.adicionaisitensproduto,
              cdgrupoadc: b.cdgrupoadc, 
              desc_grupo_adc: b.desc_grupo_adc, 
              eobrigatorio: b.eobrigatorio,
              esabor: b.esabor,
              nome: b.nome,
              ordemgrupoadc: b.ordemgrupoadc, 
              orientacao_grupo_adc: b.orientacao_grupo_adc,
              qtdemax: b.qtdemax,
              qtdemin: b.qtdemin
            }  
          })
        })
    
     
  
  function onDetalheProduto (cdproduto,imagens,precofinalvenda,descricao,detalhes, index) {
    store.itemSelect.cdproduto = cdproduto 
    store.itemSelect.descricao = descricao 
    store.itemSelect.precofinalvenda = precofinalvenda 
    store.itemSelect.detalhes = detalhes
    store.itemSelect.imagens = imagens
    store.itemSelect.index = index
    store.recursos.telaContentAtual ='SELECTPRODUTO';
    store.recursos.telaAtualNome    ='DETALHES';
    console.log('Item Selecionado: '+store.itemSelect.id) 
  }
     
     </script>
     
     <style>
     /* The switch - the box around the slider */
     .switch {     
       display: inline-block;
       width: 60px;
       height: 34px;
     }
      
     .conteudo {
       
      flex-direction: row;
      /* justify-content: center; */
      align-items: center;
      width: 100%;
      overflow-x: auto;
  }
    
    .fundoSelect {
      background: rgb(233, 232, 231);
    } 
  
     </style>