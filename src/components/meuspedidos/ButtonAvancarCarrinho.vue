<template>
 
   <!--Botoes--> 
 <div style="  position: fixed; width: 100%;
                         bottom: 0;
                         background: rgb(233, 232, 231);
                         padding: 5px;
                         ">
        <button
              type="button" 
              class="btn btn-success btn-lg btn3d"
              style="width: 100%;     
                margin: 0px 0px 0px 0px;       
              "    
			   @click="avancar()"
              >
              <span class="glyphicon glyphicon-ok"></span> 
              Adicionar (Total: R$ 
                {{formataDinheiro(somar(),2)}} 
                )
      </button>
      </div>
   <!--Botoes-->   

   
 
    
</template>

<script setup>
import {indexStore} from '../../stores/index'  
const store = indexStore(); 

 
function somar() {
    var somarAdicionais = store.adicionalSelecao.map(item => {
    return(item.valorunitario * item.quantidade)
    })
  let soma = 0
  for(let i in somarAdicionais) {
    soma += somarAdicionais[i] 
  }
  return soma + store.pizzaSelecao[0].quantidade * store.pizzaSelecao[0].valorunitario
}

function pizzaMaiorValor() {   
    var maiorValor = store.pizzaSelecao.filter(p => p.isadicionalprod=='n').map((a) => {return a.valorunitario})
        var max = maiorValor.reduce(function(a, b) {           
            return Math.max(a, b)
        }, -Infinity)
        
  return max
}
console.log('Valor Maior Pizza de 2 sabores é: '+pizzaMaiorValor())


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
 


const avancar = () =>{
    store.recursos.etapaPedido=3
    store.recursos.telaAtualNome='CARRINHO'  
    store.recursos.alertaCarrinho=false
 
 if (store.selectItem.qtdemax < 2) {    
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

    } else{

        store.pizzaSelecao.filter(d => d.isadicionalprod == 'n').map((i, indexFora) => {   
            store.pizzaSelecao[indexFora].ingredientes=store.ingredientesSelecao.filter(p => p.cdproduto == i.cdproduto)
            }) 
        
        store.adicionalSelecao.forEach( a => {
            store.pizzaSelecao.push(a)
        })

        store.pedido.pedido.pedidoitem.push({
                                            adicionais: store.pizzaSelecao, 
                                            cdproduto: 47,
                                            descricao: 'PIZZA 2 SABORES',
                                            ingredientes: [],
                                            isadicionalprod: 'n',
                                            observacao: 'obs NO Componente Button Avancar Carrinho',
                                            quantidade: 1,
                                            valortotal: 1 * pizzaMaiorValor(),
                                            valorunitario: pizzaMaiorValor()
                                        })
    
        console.log(store.pedido)  
    }
 
}

 


</script>

<style>

</style>