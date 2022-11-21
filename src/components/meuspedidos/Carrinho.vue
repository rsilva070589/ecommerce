<template>

  <div class="conteudo" style="padding: 0px 0px 0px 0px; margin-top: 53px; height: 65vh;">

      
    <div v-if="store.pedido.pedido?.pedidoitem?.length == 0"
          style="text-align: center
            
          ">      
          <div style="fill: Grey;
                margin-top: 90px; ;
                margin-left: auto;
                margin-right: auto;
                font-size: 35px;
                width: 50px
          ">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>
          </div>
          
          <div style="font-size: 35px;">
            Está com fome?
          </div>
          <div style="font-size: 25px;">
            Seu pedido está vazio
          </div>
          
    </div>    
    
 
    <div v-for="(p, indexA) in store.pedido" :key="indexA" >




      <div v-for="(pi, indexB) in p.pedidoitem" :key="indexB" class="">
        <div style="display: flex;
                    justify-content: space-between;
                    width: 100%;
                    padding: 10px;
                    border-bottom: 1px solid Grey;
                    "
                class="grid-container">

  
           <div v-if="store.dadosEmpresa.ecommerce">
            <img  v-if="pi.url"
                  style="width: 50px;
                        height: 50px;" 
                :src="pi.url" alt="">

                <img  v-if="!pi.url"
                  style="width: 50px;
                        height: 50px;" 
                :src="pi.adicionais[0].url" alt="">    

                   
          </div>

           
         <div class="item1" style="width: 180px;">
          {{pi.descricao}} - R$ {{store.formataDinheiro(pi.valorunitario * pi.quantidade, 2)}} 
          <div v-for="(adic, indexC) in pi.adicionais" :key="indexC">
            <div style="font-size: 12px; margin-left: 0px; border-style: ;">
              * {{adic.descricao}} - R${{store.formataDinheiro(adic.valorunitario * adic.quantidade, 2)}}
            </div> 
          </div>          
         </div> 
         


        <div  class="item3"
                style=" 
                margin: 4px;    
                height: 28px;
                width: 80px;
                display: inline;                
                background-color: ;
                font-size: 20px;
                font-weight: bold;               
                border-radius: 4px;                
                ">

                <div style="padding: 0px;
                            margin: -4px 0px 0px 1px;
                            
                            
                ">
                  
                  <span v-if="pi.quantidade == 1"
                    @click="deleteItem(indexB)"
                    style="font-size:22px;">                               
                      <i  style="color: DodgerBlue;" class="bi bi-trash"></i>
                  </span>

                  <span v-if="pi.quantidade > 1"
                    @click="menosUm(indexB)"
                    style="font-size:22px;">                      
                      <i style="color: DodgerBlue; "                       
                      class="bi bi-dash-square-fill fa-5x"></i>
                  </span>

                  <span style="font-size: 20px;
                              margin: 8px;
                  ">
                    {{pi.quantidade}}
                  </span>

                
                  
                  

                  <span 
                    @click="maisUm(indexB)"
                      style=" 
                        text-align: center ;                
                        margin-top: 0px;
                        font-size: 22px;            
                                                            
                    ">
                    <i style="color: DodgerBlue; font-size:px;" class="bi bi-plus-square-fill"></i>
                    </span>                   

                </div>
         </div>          
          
          
        </div>
    </div>
    </div>


</div>




<div class="card" style="position: fixed; 
                         width: 100%;
                         bottom: 0;
                         ">

<div v-if="store.recursos.alertaCarrinho && store.pedido.pedido.pedidoitem.length == 0"
  style="color: red; padding: 15px; text-align: center; font-size: 23px;" >
  Seu carrinho esta vazio! clique em  
  <span style="color: blue;" @click="novoPedido()" >"continuar comprando"</span> 
  para escolher um Produto!
</div>
    <!--Botoes-->
    
    <div style="text-align: center; padding: 5px; font-size: 22px;">
      Valor Total do Pedido: R${{store.formataDinheiro(store.pedido.pedido.valorpedido,2)}}
    </div>
    

    <div style="display: flex; justify-content: center; padding: 6px; margin: 0px 7px 0px 7px;">
    
 
     <button
              type="button" 
              class="btn btn-primary btn-lg btn3d"
              style="width: 100%;     
                margin: 0px 0px 0px 0px;       
              "    
			   @click="novoPedido()"
              >
              <span class="glyphicon glyphicon-ok"></span> 
              Continuar Comprando    
      </button>


   </div> 
  
   <div style="display: flex; justify-content: center; padding: 6px; margin: 0px 7px 5px 7px;">
   
	     <!--Botoes--> 
       <div style="
               padding: 0px; width: 100%;            
               border-radius: 5px;
               color: white;
               font-size: 20px;
               text-align: center;
                         ">
        <button
              type="button" 
              class="btn btn-success btn-lg btn3d"
              style="width: 100%;     
                margin: 0px 0px 0px 0px;       
              "    
			    @click="finalizarPedido(); store.recursos.alertaCarrinho=true"
              >
              <span class="glyphicon glyphicon-ok"></span> 
              Finalizar Pedido
        </button>
      </div>
   <!--Botoes-->   

     </div>   

   <!--<HorariosEntrega cor="black" />-->
     
</div>
</template>

<script setup>
import HorariosEntrega from '../content/HorariosEntrega.vue';
import {indexStore} from '../../stores/index'  
const store = indexStore(); 

console.log('---------------------------')
console.log(store.pedido.pedido)

const finalizarPedido = () => {
   if (store.pedido.pedido?.pedidoitem?.length > 0)
   {
    store.recursos.etapaPedido=99;
    store.recursos.telaAtualNome='CADASTRO'
    store.recursos.telaContentAtual='CADASTRO'   
   }
    
}

const maisUm = (index)=> {
  var qtde = store.pedido.pedido.pedidoitem[index].quantidade
  store.pedido.pedido.pedidoitem[index].adicionais?.map(a => { 
    a.quantidade = a.quantidade+1
    a.valortotal = a.quantidade * a.valorunitario
    console.log(a)
  }) 
  store.pedido.pedido.pedidoitem[index].quantidade = qtde+1
  store.totalPedido()
}

const menosUm = (index)=> {
   var qtde = store.pedido.pedido.pedidoitem[index].quantidade
  if (qtde > 1) {
    store.pedido.pedido.pedidoitem[index].adicionais?.map(a => { 
      a.quantidade = a.quantidade-1
      a.valortotal = a.quantidade * a.valorunitario
      console.log(a)
    }) 
    store.pedido.pedido.pedidoitem[index].quantidade = qtde -1
    store.totalPedido()
  }
}

const deleteItem = (index)=> {   
    store.pedido.pedido.pedidoitem.splice(index, 1)
    store.totalPedido()
 
    
}
 

const novoPedido = ()=> {       
        if (store.selectItem.tipoEntrega == 0) { 
            store.recursos.telaContentAtual='TIPORETIRADA';   
            store.recursos.telaAtualNome='TIPO DE ENTREGA';  
            store.recursos.etapaPedido=99;                    
          }else{
            store.recursos.telaContentAtual='GRUPOPRODUTOS'; 
            store.recursos.telaAtualNome='CARDAPIO';  
            store.recursos.etapaPedido=0; 
            store.pizzaSelecao=[];
            store.adicionalSelecao =[];
            store.ingredientesSelecao = [];
            store.ingredientesProduto = [];
            store.adicionaisItensProduto = [];
              
        }   
}  


  store.totalPedido()
 
      

</script>

<style>
.conteudo {
    
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;
    width: 100%;
    overflow-x: auto;
}

 
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;  
  
}

.item1 {
  grid-column: 1 / span 2;
}
</style>
 