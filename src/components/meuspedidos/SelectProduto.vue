<template>
    <div  style="width: 100%;">

      <a href="#" class="flex flex-col  bg-white rounded-lg border shadow-md md:flex md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    
          
          <div style="position: relative;">
            <img class="object-cover  md:rounded-none md:rounded" 
               :src="store.itemSelect.urlprincipal" alt="produto"
               style="
               width: 300px; height: 220px;
               padding: 0px 15px 0px 0px;
               display: block;
               margin-left: auto;
               margin-right: auto;
               "
               >
          </div>
          
               
          <div style="padding: 10px;">
             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{store.itemSelect.nome}} R$ {{formataDinheiro(store.itemSelect.precofinalvenda,2)}}</h5>
             
             <span style="color: black; margin: 0px 0px 15px 0px;">
              {{store.itemSelect.descricao}}
             </span>

              <div style="color: black;                            
              ">
                
              Alguma observação?
              <textarea 
              v-model="obsItem"
              type="text"      
              maxlength="50"            
              placeholder="Ex: Capricha ai!"
              style="width: 100%;
                    height: 100px;
                    margin: 0px 0px 10px 0px;
              " />
              </div>

              <div 
                   style="background-color: blueviolet; 
                   justify-content: space-between;
                   display: flex; 
                   padding: 10px; 
                   border-radius: 8px; 
                   margin: 0px 0px 0px 0px;" >

                            <!-- item add e remove-->  
                       
              <div  class="card"
                    style="width: 24%; 
                    height: 25px; 
                    padding: 0px;
                    border-style: ridge;                          
                    color: black;
                    margin: 5px 0px 0px 0px;
                    "
            >
              <div style=" display: flex; ">
                <div> 
                  <div>
                    <IconMinus style="margin: 3px 8px 3px 3px; fill: red;"
                    @click="
                      () => {
                        store.itemSelect.qtde > 1 ? store.itemSelect.qtde = store.itemSelect.qtde - 1 : '';
                        
                      }
                    "  
                    ></IconMinus> 
                  </div>                    
                   </div>
                   <div>{{store.itemSelect.qtde}}</div>
                    <div >
                      <IconPlus style="margin: 3px 0px 3px 8px; ; fill: red;"
                        @click="() => {
                                (store.itemSelect.qtde = store.itemSelect.qtde + 1)
                        }"                          
                        size="15"
                        > </IconPlus
                      >
                    </div>
                  </div>
                </div> 
              <!-- fim add e remove-->
              <div>
                
              </div>
                <span style="font-size: 20px; color: white;" @click="selectProduto(store.itemSelect.cdproduto, 
                                                                                        store.itemSelect.precofinalvenda, 
                                                                                        store.itemSelect.descricao)">Adicionar  </span> 
                <span style="font-size: 20px; color: white;" @click="selectProduto(store.itemSelect.cdproduto, 
                                                                                        store.itemSelect.precofinalvenda, 
                                                                                        store.itemSelect.descricao)">R$ {{formataDinheiro(store.itemSelect.precofinalvenda * store.itemSelect.qtde,2)}}</span> 
                 
              </div>
          </div>
      </a> 
        
    </div>

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
   
   const selectProduto = (cdproduto, precofinalvenda, descricao) => {   
     
        
        console.log('add o item:  '+cdproduto + ' ' + descricao)  
            
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
      
          //  console.log('valor select : ' +listaAtualProd[index].select)
            // console.log(store.pizzaSelecao) 
 
        store.pizzaSelecao[0].adicionais=store.adicionalSelecao
        store.pizzaSelecao[0].ingredientes=store.ingredientesSelecao
        const corpoPedido = {        
                    pedido: {
                                cdcliente: store.cliente.cdcliente,
                                cdtaxaentrega: 48,
                                cdendereco: store.selectItem.cdcliente_end,
                                cdplanopagamento: 3,
                                datahora_pedido: Date.now,
                                nomeplanopagamento: store.formaPgtoDetalhe.nomeplanopagamento,
                                formapagamento: store.formaPgtoDetalhe.formapagamento,
                                obs:            '',
                                tipopedido:     store.selectItem.tipoEntrega,
                                taxaentrega:    store.selectItem.taxaentrega,                                
                                valortroco: 0,
                                pedidoitem: []
                            }                    
                 }    

                 store.pizzaSelecao.forEach(dados => {                
                                    store.pedido.pedido.pedidoitem.push(dados)
                                })
    console.log(store.pedido)  

            store.recursos.telaContentAtual ='PRODUTOS';
            store.recursos.telaAtualNome    ='CATALAGO';
            store.itemSelect.qtde=1
            store.pizzaSelecao = []
 
 
   
   }
   
   </script>
   
<style>


</style>
