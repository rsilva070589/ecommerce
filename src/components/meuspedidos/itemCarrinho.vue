<template> 
 
    <div 
      style="            
      padding: 0px;
        margin: 0px 0px 5px 5px;   
        width: 80%; 
      "
    >   
  
    <div class="grid grid-cols-3 gap-2" > 
        <div style="width: 120px;"> 
          <span class="relative inline-block ml-0" style="margin: 10px 0px">
            <img class="w-16 h-16 text-gray-700 fill-current" :src=foto   />    
            <span class="absolute top-0 right-0 inline-block transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              <IconPencil style="fill: red; 
                          border-radius: 5px; 
                          background-color: white;
                          width: 22px;
                          height: 22px;
                          "
                          @click="onDetalheProduto(index)"
                          />
            </span>
          </span>            
        </div> 
  
        <div style="width: 240px; margin: 5px; "> 
            <div style="font-size: 15px;color:black" >
              {{ nome }}
            </div>  
            <div style="font-size: 13px; color:black"  >
                {{ descricao }}
            </div>  
            <div v-if="store.carrinho[index].obsItem != ''" 
                style="font-size: 10px; color:orangered"  >
                Obs: {{store.carrinho[index].obsItem}}
            </div>  
  
            <div style="  display: flex; 
                          justify-content: space-between;  
                          ">
                    
                    <div style="font-size: 16 px;color:black"> 
                      R$  {{formataDinheiro(store.carrinho[index].valor, 2) }}
                    </div>                    
                                  
                    <!-- item add e remove-->  
                             
                    <div class="card"
                            style="width: 35%; 
                            height: 25px; 
                            padding: 0px;
                            border-style: ridge;                          
                            color: black;
                            "
                  >
                    <div style=" display: flex; ">
                      <div> 
                        <div v-if="qtde < 2" style="margin: 2px 13px 3px 5px;">
                          <IconTrash style="fill: red"
                          @click="deleteProdutoCarrinho(index)"
                          color="red"
                          size="15"
                          ></IconTrash 
                        >
                        </div>
                        <div v-else>
                          <IconMinus style="margin: 3px 13px 3px 3px; fill: red;"
                          @click="
                            () => {
                              qtde > 1 ? qtde = qtde - 1 : '';
                              putProdutoCarrinho(index, qtde);
                            }
                          "  
                          ></IconMinus> 
                        </div>                    
                         </div>
                         <div>{{qtde}}</div>
                          <div >
                            <IconPlus style="margin: 3px 3px 3px 13px; ; fill: red;"
                              @click="() => {(qtde = qtde + 1)
                                putProdutoCarrinho(index, qtde);
                              }"                           
                              size="15"
                              > </IconPlus
                            >
                          </div>
                        </div>
                      </div> 
                    <!-- fim add e remove-->
  </div>
  
  
        </div>      
    </div>
          
      
    </div>
    
  </template>
  
  <script setup>
  import {indexStore }      from '../../../../stores/index';
  import IconTrash from '../../icons/IconTrash.vue';
  import IconPlus from '../../icons/IconPlus.vue';
  import IconMinus from '../../icons/IconMinus.vue';
  import IconPencil from '../../icons/IconPencil.vue'; 
  const store = indexStore()
  
  const props = defineProps({    
      id:   String,
      nome: String,
      foto: String,
      descricao: String,
      obsItem: String,
      qtde: Number,
      valor: Number,
      valorOri: Number,     
      index: Number
   })
  
  
   const deleteProdutoCarrinho = (indexAtual) => {    
    console.log('deletar item do carrinho')
    store.carrinho.splice(indexAtual,1)
    somar()
  }
    
   const putProdutoCarrinho = (index, qtdeAtual) => {    
    store.carrinho[index].qtde = qtdeAtual
    store.carrinho[index].valor = store.carrinho[index].valorOri * qtdeAtual
    somar() 
  }
   
  function somar() {
    var totalItens = store.carrinho.map(item => {
      return(item.valorOri * item.qtde)
    })
  
  
    let soma = 0
    for(let i in totalItens) {
      soma += totalItens[i]
    }
    store.resumoCarrinho.valorTotalItens=(soma)
    console.log('Valor totalItens: ' + totalItens)
    return soma
  }
  somar()
  
  function onDetalheProduto (indexAtual) {  
     
    store.itemSelect.nome = props.nome
    store.itemSelect.descricao = props.descricao   
    store.itemSelect.qtde = props.qtde 
    store.itemSelect.index = indexAtual 
    store.recursos.telaAtual='EDITPRODUTO'    
   
  }
  
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
  
   
  </script>