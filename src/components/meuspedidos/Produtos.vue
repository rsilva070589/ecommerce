<template>   

  <!--Pizza-->
  <div v-if="!store.dadosEmpresa.ecommerce"> 
  <div :class="(store.pizzaSelecao.length > 0) ? ['fundoSelect'] : ['']">

  

   <div class="conteudo" v-if="store.recursos.etapaPedido==1"
               style="color: white;
               
               height: 85vh;  
               margin-top: 8px;               
               padding: 12px 0px 0px 0px;
               background-size: 100% 94vh;               
               width: 100%; 
                
   ">
   
   <div style="padding: 10px; background-color: dimgray; font-size: 20px; ">
      <i class="bi bi-chevron-down"></i>
     Sabor   
   </div>   
   
   <div :class="!(store.pizzaSelecao.length >= store.selectItem.qtdemax && store.selectItem.qtdemax > 0) ? ['classeEnable'] : ['classeDisable']"
   >
 
   <div      
   
       :class="{'classeEnable': i.select}"   
       style="padding: 8px;  
              color: black;  
              border-bottom: 1px solid Grey;                 
       "       
       v-for=" (i, index) in listaAtualProd" :key="i.cdproduto"       
       @click="selectProduto(i.cdproduto,i.precofinalvenda,i.descricao,index, store.selectItem.qtdemax)"
       >  
       <div style="
              display: flex;
              justify-content: space-between;             
                "
                  
               >
         <div style="text-align: ;">
             
             {{i.descricao}}{{i.descricaoproduto}}
          
             <span style="font-size: 13px;
                          padding: 0;
                    ">
                    <div v-if=" i.ingredientes">
                      {{i.ingredientes}}
                    </div>
              
             </span> 
  
            <div>
              <span style="color: green;">
               <span style="color: green;"> 
                 R$  {{formataDinheiro( i.precofinalvenda, 2) }}                
               </span> 
             </span>       
            </div>
             
       </div>
       
        <!--css para selecionado-->
        <div v-if="(store.pizzaSelecao.length < store.selectItem.qtdemax ) 
                    && store.selectItem.qtdemax > 0 && !i.select 
                    "
             
            style="margin-top: 0px;">
           <label class="switch">  
             <IconSwitchOff fill="Grey" style=""/>
           </label>
       </div>
      <div v-if=" i.select 
                  && store.selectItem.qtdemax > 0"            
        
           style="margin: 0px;
           
           ">
          <label class="switch" >              
            <IconSwitchOn fill="green"/>
          </label>
      </div> 
   
       <div v-if="(store.pizzaSelecao.length >= store.selectItem.qtdemax) 
                  && !i.select
                  && store.selectItem.qtdemax > 0
                  "            
           style="margin-top: 0px;">
          <label class="switch" >   
            <IconSwitchOff fill="Grey"/>
          </label>
      </div>

      <div v-if="store.selectItem.qtdemax == 0  && !i.select"   
              
           style="margin-top: 0px;">
          <label class="switch" >   
            <IconSwitchOff fill="Grey"/>
          </label>
      </div>

      <div v-if="store.selectItem.qtdemax == 0  && i.select" 
          
           style="margin-top: 0px;">
          <label class="switch" >   
            <IconSwitchOn fill="green"/>
          </label>
      </div>
        <!--FIM css para selecionado-->

 
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
    <!--Pizza--> 

<!--Diversos-->
  <div v-if="store.dadosEmpresa.ecommerce"> 
  <div :class="(store.pizzaSelecao.length > 0) ? ['fundoSelect'] : ['']"> 

   <div class="conteudo" v-if="store.recursos.etapaPedido==1"
               style="color: white;               
               height: 85vh;  
               margin-top: 8px;               
               padding: 12px 0px 0px 0px;
               background-size: 100% 94vh;               
               width: 100%; 
                
   ">
   
   <div style="padding: 10px; background-color: dimgray; font-size: 20px; 
              
   ">
      <i class="bi bi-chevron-down"></i>
     CATALAGOS
   </div>   
   
   <div :class="!(store.pizzaSelecao.length >= store.selectItem.qtdemax && store.selectItem.qtdemax > 0) ? ['classeEnable'] : ['classeDisable']"
   >
 
   <div      
   
       class="card"
       style=" 
              color: black;        
              margin: 5px;         
       "       
       v-for=" (i, index) in listaAtualProd" :key="i.cdproduto"       
       @click="onDetalheProduto(i.cdproduto,i.imagesproduto.urlprincipal,i.precofinalvenda,i.descricao,i.detalhes, index)"
       
       >  
       <div style="
              display: flex;           
                "  >
          
          <div >
            <img style="width: 130px;
                        height: 110px;" 
                :src="i.imagesproduto.urlprincipal" alt="">
          </div>

         <div style="  
                        padding: 5px;
                        width: 210px;
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
                 R$  {{formataDinheiro( i.precofinalvenda, 2) }}                
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
    <!--Diversos--> 


 
 </template>
   
<script setup>
 
 import IconSwitchOn from '../icons/IconSwitchOn.vue'
 import IconSwitchOff from '../icons/IconSwitchOff.vue'
 import Ingredientes from './Ingredientes.vue'
 import AdicionaisProduto from './AdicionaisProduto.vue';
 import axios from 'axios';
 import {indexStore} from '../../stores/index'  
 const store = indexStore();

 store.dadosEmpresa.ecommerce=true
 
console.log(store.produtos)
console.log('cod do grupo para filtro de produtos :' + store.selectItem.codGrupo)

const grupo = g => g.cdgrupo == store.selectItem.codGrupo
const listaAtualProd =  store.produtos.filter(grupo)  


listaAtualProd.map(i => {
  i.select = null
})

   listaAtualProd.forEach(a => {
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

   
   listaAtualProd.forEach(a => { 
    store.adicionaisProduto=a.adicionaisproduto
     a.adicionaisproduto.forEach( b=> {
      // console.log(b)
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
       // console.log(adc)
        //store.adicionaisItensProduto.push(adc)
        })
      })
  
  
   
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
   
   const selectItem = (cdproduto,  precofinalvenda, descricao, index, qtdemax) => {   
     var numeroARemover = cdproduto;
     let itemExiste = store.pizzaSelecao.findIndex(obg => obg.cdproduto  == numeroARemover)

   if (   store.pizzaSelecao.length >= store.selectItem.qtdemax
       && store.selectItem.qtdemax > 0
       && itemExiste < 0
   ) {
    console.log('limite atingido')
   } else{
      if (itemExiste < 0)
        {       
        console.log('add o item:  '+cdproduto + ' ' + descricao + ' index: '+index)  
            
        store.pizzaSelecao.push(          
                {
                'cdproduto': cdproduto,
                'descricao': descricao,
                'observacao': 'observacao teste componente Produtos',
                'isadicionalprod': 'n',
                'valorunitario': precofinalvenda,
                'quantidade': 1,
                'valortotal': precofinalvenda * 1
                }
            )
            listaAtualProd[index].select=true
          //  console.log('valor select : ' +listaAtualProd[index].select)
            // console.log(store.pizzaSelecao) 
      }else {
        console.log('remove o item:  '+cdproduto + ' ' + descricao)
        listaAtualProd[index].select=false
        var numeroARemover = cdproduto;
        var indice = store.pizzaSelecao.findIndex(obg => obg.cdproduto  == numeroARemover)
        store.pizzaSelecao.splice(indice, 1);
        //console.log('valor select : ' +listaAtualProd[index].select)
        // console.log(store.pizzaSelecao); 
      }  
   } 
 
   
   }


   function onDetalheProduto (cdproduto,urlprincipal,precofinalvenda,descricao,detalhes, index) {
  
  
  store.itemSelect.cdproduto = cdproduto 
  store.itemSelect.descricao = descricao 
  store.itemSelect.precofinalvenda = precofinalvenda 
  store.itemSelect.detalhes = detalhes
  store.itemSelect.urlprincipal = urlprincipal
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