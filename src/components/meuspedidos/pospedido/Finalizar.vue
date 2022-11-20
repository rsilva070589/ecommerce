<template>
  <span style="color: white;">
 
  </span>


  <div v-if="!store.recursos.carregando">   
  
  <div style="margin-top: 0px;">
    <div style="color: white;              
                padding: 15px 10px 10px 10px; 
                width: 100%;                
                font-size: 13px;
                color: white;              
                ">   
  
    <div  >
      Observações:

      <span style="color: white;">
             
               </span>

      <div >
        <textarea style="width: 100%; 
                        height: 60px;
                        border-radius: 6px;
                        padding: 6px;
                        "             
                                  
                        placeholder="Alguma Observação para esse pedido? digite aqui..."
                        v-model="store.pedido.pedido.obs"                      
                >
              </textarea>
      </div>    
    </div>
   
    <div style="padding-bottom: 5px;" >
      Opções de Entrega
      <div>
       
      </div>
      <div v-if="store.pedido.pedido.tipoEntrega < 1"
            style="color: red; font-size: 20px;
              background-color: white;
              width: 100%;
              height: 30px;
              text-align: center;
              font-weight: bold;
              border-radius: 5px;"
            >
      TIPO DE ENTREGA OBRIGATÓRIO! *
      </div>
 
 
  
      <div >
        <select id="" style="width: 100%; height: 40px; border-radius: 6px;"
                v-model="store.selectItem.tipoEntrega"
                @change="direcionaEndereco(); txEntrega(); viewEnderecoTela(); totalPedido()"                
        >
       
        
        <option value=2>Entregar em domicilio</option>
        <option value=1>Retirada no local</option> 
      
      
      </select>
      </div>    
    </div>
   
    
    <div v-if="store.selectItem.tipoEntrega == 2">
      <div  >
      Endereço de Entrega:
      <div >

        <div   v-if="store.selectItem.tipoEntrega == 2
                  && !store.cliente.enderecos[0]?.cdcliente_end > 0 
                  && store.validation.validaEndereco
                  "
                   style="color: red; font-size: 16px;
                  background-color: white;
                  margin-top: 7px;
                  margin-bottom: 2px;
                  width: 100%;
                  height: 30px;
                  text-align: center;
                  font-weight: bold;
                  border-radius: 5px;"                  
                  >
                      PEDIDO DELIVERY PRECISA DE ENDEREÇO!
       </div>  

        <div 
               style="width: 100%; 
                      min-height: 25px;
                      border-radius: 6px;
                      background-color: white;
                      color: black;
                      padding: 3px;
                    ">
              <span  v-if="store.cliente.enderecos[store.selectItem.indexEndereco]?.logradouro">
                Logradouro: {{store.cliente.enderecos[store.selectItem.indexEndereco]?.logradouro}}  
                Cidade: {{store.cliente.enderecos[store.selectItem.indexEndereco]?.cidade}}  
                Bairro: {{store.cliente.enderecos[store.selectItem.indexEndereco]?.bairro}}
                Nº Casa: {{store.cliente.enderecos[store.selectItem.indexEndereco]?.nrendereco}}
                Referência: {{store.cliente.enderecos[store.selectItem.indexEndereco]?.complementoendereco}}
                      
                      
                      
              </span>     
              
       
              
               
             
      </div>
      </div>    
    </div>
    <div style="display: flex;
                  justify-content: space-between; 
                  padding: 6px 0px 0px 0px; 
                  margin: 0px 0px 0px 0px;">
        
    <!--Button Avançar-->
  <button style="
                padding: 10px; width: 50%;            
                border-radius: 5px;
                color: white;
                font-size: 15px;
                text-align: center;
                "
                @click="trocarEndereco()"   type="button" 
              class="btn btn-primary btn-lg btn3d">
       <span  class="glyphicon glyphicon-ok"></span>    
       <i class="bi bi-arrow-clockwise"></i>       
        Trocar Endereço       
  </button>
 <!--Button Avançar-->
  
        <!--Button Avançar-->
  <button style="
                padding: 10px; width: 50%;            
                border-radius: 5px;
                color: white;
                font-size: 15px;
                text-align: center;
                "
                @click="cadastroEndereco()"   type="button" 
              class="btn btn-primary btn-lg btn3d">
       <span  class="glyphicon glyphicon-ok"></span>    
       <i class="bi bi-plus"></i> Cadastrar Novo     
  </button>
 <!--Button Avançar-->
  
      </div> 
    </div>
  
   
  
  <div style="padding: 0px; ">
    <div v-if="store.selectItem.tipoEntrega == 2"
          style=" padding: 0px 8px 0px 8px; width: 100%;            
                  border-radius: 5px;
                  color: white;
                  font-size: 17px;
                  text-align: right;">
      + Taxa de Entrega: R$ {{formataDinheiro((store.cliente.enderecos[store.selectItem.indexEndereco]?.valorentrega) || 0,2)}}
    </div>
  
    <div style="  border-style: dotted;
                  width: 100%;
                  bottom: 0;
                  ">
  
      <div style="
                  padding: 8px; width: 100%;            
                  border-radius: 5px;
                  color: white;
                  font-size: 20px;
                  text-align: center;
                "
            
        >            
         Total do Pedido: 
         <span style="font-weight: bold;">
          R$ {{formataDinheiro(store.pedido.pedido.valorpedido,2)}}
         </span>
         
         
      </div>
      </div>
  </div>
   
  
  <div v-if="!store.selectItem.valortroco==0 
                        && store.validation.validatroco 
                        && store.pedido.pedido.valorpedido > store.selectItem.valortroco"
                   style="color: red; font-size: 16px;
                  background-color: white;
                  margin-top: 7px;
                  width: 100%;
                  height: 30px;
                  text-align: center;
                  font-weight: bold;
                  border-radius: 5px;"                  
                  >
                      TROCO DEVE SER MAIOR QUE VALOR DO PEDIDO!
               </div>  
  
               <div v-if="store.validation.pagamento && store.formaPgtoDetalhe.formapagamento == null" 
               style="color: red; font-size: 20px;
                  background-color: white;
                  margin-top: 7px;
                  width: 100%;
                  height: 30px;
                  text-align: center;
                  font-weight: bold;
                  border-radius: 5px;">
                   Escolha uma Forma de Pagamento!
               </div> 
  
  
    <div   style="border-radius: 5px; 
                background-color: white; color: black;  
                 margin-top: 7px; color: white;">
      <div style="font-size: 16px; text-align: ; color: black; padding: 0px 0px 0px 5px; ">
      Forma de Pagamento: {{store.formaPgtoDetalhe.nomeplanopagamento}}    
     
    </div>
        
      <div style="font-size: 11px; 
                  height: 40px;
                  display: flex; 
                  justify-content: center;
                  color: black;   
                  padding: 4px;
                  
                  ">
                  
        <div       
        :class="(store.formaPgtoDetalhe.nomeplanopagamento == p.nomeplanopagamento) ? [' card pgtoSelect'] : [' card pgtoNotSelect'] "
        style="display: flex; padding: 0px;  
                            
                width: 83px; 
                text-align: center;
                padding-top: 7px;
                border-radius: 0;
                "
        
        
          v-for="(p, indexP) in store.formaspgto.pagamentos" :key="indexP"
  
        @click="selectPgto(p.cdplanopagamento, 
                                  p.descricaoPgto ,
                                  p.nomeplanopagamento,
                                  p.chavepix,
                                  p.recebedorpix,
                                  p.formapagamento,
                                  p.tipochavepix)"  
        >
           {{p.nomeplanopagamento}}                       
        </div>
      </div>    
         
      <div v-if="store.formaPgtoDetalhe.formapagamento != null">         
          <FormaPgto  />         
        </div>
        
    </div>  
  
  
  </div>
    
  </div>
  
  
   
  
      <!-- BOTTTON-->
      <div class="" style="position: fixed; 
                           width: 100%;
                           bottom: 0; 
                           ">
  
     <div style="display: flex; justify-content: center; padding: 3px; margin: 0px 7px 5px 7px;">
      <button
                type="button" 
                class="btn btn-success btn-lg btn3d"
                style="width: 100%;     
                  margin: 0px 0px 0px 0px;       
                "    
            @click="validation(); "
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
  
                ENVIAR PEDIDO
          </button>
       </div> 
   </div> 
          <!--fim BOTTTON-->
  
  
  
  </div>
  
  <Carregando />
   
  </template>
  
  <script setup>
  import IconCarrinho from '../../icons/IconCarrinho.vue';
  import Carregando from '../../content/Carregando.vue';
  import axios from 'axios'
  import FormaPgto from './FormaPgto.vue'
  import {indexStore} from '../../../stores/index'  
  const store = indexStore(); 
  
  function trocarEndereco () {
    console.log('trocar endereço')
    store.recursos.telaAtualNome='TROCAR ENDEREÇO'
    store.recursos.telaContentAtual='MINHACONTA';
    store.recursos.sidebar=false               
    
  }
  
  function cadastroEndereco () {
    store.recursos.etapaPedido=99; 
                    store.recursos.telaAtualNome='CADASTRAR ENDEREÇO';
                    store.recursos.telaContentAtual='ENDERECO'  
                    store.recursos.carregando=false  
                    
  store.bairroUpdateCreate =  {            
          cdcliente_end: 0,
          idbairro: 0,
          bairro: 'BUSCARNOME',            
          cep: 0,
          cidade: '',
          complemento: '',
          logradouro: '',
          nrendereco: '',
          valorentrega: 0,
          cdproduto: 0,
          validation: {
                          cidade: false,
                          complemento: false,
                          logradouro: false,
                          nrendereco: false,
                          validado: false,
                          optionSelect: false
                      } 
  
      }
  
  }
  
  
  function txEntrega () {
   
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
   
    
    console.log('funcao taxa de entrega' + store.selectItem.tipoEntrega)
    if (store.selectItem.tipoEntrega == 2) {
     
    store.pedido.pedido.tipopedido   = store.selectItem.tipoEntrega  
    store.pedido.pedido.cdendereco    = store.cliente.enderecos[store.selectItem.indexEndereco]?.cdcliente_end
    store.pedido.pedido.cdtaxaentrega = store.cliente.enderecos[store.selectItem.indexEndereco]?.cdproduto
    store.pedido.pedido.taxaentrega   = store.cliente.enderecos[store.selectItem.indexEndereco]?.valorentrega || 0
    store.pedido.pedido.valorpedido   = store.pedido.pedido.valorpedido + store.pedido.pedido.taxaentrega 
    }else{
      store.pedido.pedido.tipopedido    = store.selectItem.tipoEntrega      
      store.pedido.pedido.cdtaxaentrega = 0
      store.pedido.pedido.taxaentrega   = 0
      store.pedido.pedido.valorpedido   = store.pedido.pedido.valorpedido
    }
  totalPedido()
  }
  
  function viewEnderecoTela() {
    console.log('funcao viewEnderecoTela')
  }
  viewEnderecoTela()
  
  
  
  
  store.pedido.pedido.cdcliente   = store.cliente.cdcliente
  store.pedido.pedido.cdendereco  = store.selectItem?.cdcliente_end
  store.pedido.pedido.tipopedido  = store.selectItem.tipoEntrega
  store.pedido.pedido.valortroco  = store.selectItem.valortroco 
  
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
  
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hora = today.getHours();
  let minutos  = today.getMinutes();
  let seguntos = today.getSeconds();
  
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  if (hora < 10) hora = '0' + hora;
  if (minutos < 10) minutos = '0' + minutos;
  if (seguntos < 10) seguntos = '0' + seguntos;
  
  
  const formattedToday = dd + '/' + mm + '/' + yyyy;
  const HoraMin = hora + ':' + minutos + ':' + seguntos;
  store.pedido.pedido.datahora_pedido = formattedToday + ' ' + HoraMin
   
  function validation () {
    store.pedido.pedido.valortroco  = store.selectItem.valortroco 
    console.log('Forma PGTO: ' + store.formaPgtoDetalhe.formapagamento)
    console.log('vlr pedido: ' + store.pedido.pedido.valorpedido)
    console.log('Vlr Troco: ' +  store.pedido.pedido.valortroco)
    console.log('store.selectItem.valortroco: ' +  store.selectItem.valortroco)

   

   
    if (
        store.selectItem.tipoEntrega == 2 
    && !store.cliente.enderecos[0]?.cdcliente_end > 0 )
     {
      store.validation.validaEndereco=true
      console.log('store.validation.validaEndereco=true')
    }else{
      store.validation.validaEndereco =false
      console.log('store.validation.validaEndereco =false')
    }

  
    if (store.pedido.pedido.valortroco < store.pedido.pedido.valorpedido 
        && store.pedido.pedido.formapagamento=='Dinheiro'
        && store.pedido.pedido.valortroco!=0      
        ) {
      store.validation.validatroco =true
      console.log('store.validation.validatroco =true')
    }else{
      store.validation.validatroco =false
      console.log('store.validation.validatroco =false')
    }
  
  
    if (store.formaPgtoDetalhe.formapagamento == null) {
      store.validation.pagamento = true
      console.log('tem que escolher uma forma de pagamento!')
      console.log(store.validation.pagamento)
    } else{
  
      if (store.pedido.pedido.tipopedido > 0
       && !store.validation.validatroco
       && !store.validation.validaEndereco) {
        store.validation.pagamento = false
        store.validation.validaEndereco = false
        console.log('enviando pedido')
        envioPedido()
      } else{
        console.log('encontrou erros, nao pode enviar pedido')
        console.log('tipo entrega: '+store.pedido.pedido.tipopedido)  
      }
      
    }
    
  }
  
  
  function selectPgto  (cdplanopagamento, descricaoPgto ,nomeplanopagamento,chavepix,recebedorpix,formapagamento,tipochavepix) 
  {
    store.formaPgtoDetalhe.cdplanopagamento = cdplanopagamento  
    store.formaPgtoDetalhe.descricaoPgto    = descricaoPgto
    store.formaPgtoDetalhe.nomeplanopagamento = nomeplanopagamento
    store.formaPgtoDetalhe.chavepix         = chavepix
    store.formaPgtoDetalhe.tipochavepix     = tipochavepix
    store.formaPgtoDetalhe.recebedorpix     = recebedorpix
    store.formaPgtoDetalhe.formapagamento   = formapagamento  
    store.pedido.pedido.cdplanopagamento  = cdplanopagamento            
    store.pedido.pedido.nomeplanopagamento= nomeplanopagamento
    store.pedido.pedido.formapagamento    = formapagamento    
  }
  
  
  const envioPedido = ()=> {
  store.recursos.carregando = true
  store.selectItem.statusDefinido='EM ANDAMENTO'
   
  if (1) {
   
    var data = JSON.stringify({
    "databasecliente": store.recursos.databasecliente,
    "pedido": store.pedido.pedido
    
  });
  
  var config = {
    method: 'post',
    url: 'https://easypedidos.sytes.net:8082/evento/setdadospedidos',
    headers: { 
      'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    console.log('gerado pedido com sucesso N. : ' + response.data.dados.cdpedido)
    store.selectPedido.cdpedido=response.data.dados.cdpedido
    store.selectPedido.getnrsenha_entrega=response.data.dados.getnrsenha_entrega
    store.recursos.etapaPedido=99;
    store.recursos.telaAtualNome='STATUS DO PEDIDO'
    store.recursos.telaContentAtual='STATUSPEDIDO'    
    novoPedido()
    store.formaPgtoDetalhe.formapagamento = null
    store.recursos.carregando=false
  })
  .catch(function (error) {
    console.log(error);
  });
  }else{
    console.log('pedido Delivery precisa de endereço')
    direcionaEndereco()
  }
  
  }
  
  const direcionaEndereco = () => {
  
        
        if ( !store.cliente.enderecos[store.selectItem.indexEndereco]?.cdcliente_end  > 0  &&  store.selectItem.tipoEntrega == 2  ) {
              store.recursos.etapaPedido=99;
              store.recursos.telaAtualNome='CADASTRAR ENDEREÇO';
              store.recursos.telaContentAtual='ENDERECO';
              store.recursos.carregando=false           
        }else{
          console.log('tipo de entrega é: ' + store.selectItem.tipoEntrega)
        }
    } 
    
  
  
  
  
  
  function totalPedido ()  {
  
  /** somatoria de Todos os adicionais */
    const ArrayProv = []
    var pitem = store.pedido.pedido?.pedidoitem?.map(a => {    
      
      var t = a.adicionais?.filter(f => f.isadicionalprod == 's')
        
      var x = t?.map(i => {return i.valortotal}) || 0    
      //console.log(x)
      var soma = 0;
        for(var i = 0; i < x.length; i++) {
            soma += x[i];
        }      
        ArrayProv.push(soma)    
       
    })
  
    
    var totalAdicionais = 0;
    for(var i = 0; i < ArrayProv.length; i++) {
      totalAdicionais += ArrayProv[i];
    }
  /** fim somatoria de Todos os adicionais */
   
  
        var somarPizza = store.pedido.pedido.pedidoitem.map(pedidoitem => {
        return (pedidoitem.valorunitario * pedidoitem.quantidade) // + somaAdic      
        }) 
        let totalpizzas = 0
        for(let i in somarPizza) {
          totalpizzas += somarPizza[i] 
        }
         
        store.pedido.pedido.valorpedido =  totalpizzas +totalAdicionais+ store.pedido.pedido.taxaentrega
    
  } 
  
    totalPedido()
    txEntrega()
    
  
  const novoPedido = ()=> {
       store.pizzaSelecao=[];
       store.adicionalSelecao =[];
       store.ingredientesSelecao = [];
       store.ingredientesProduto = [];
       store.adicionaisItensProduto = [];    
       store.selectItem.valortroco=0; 
       store.formaPgtoDetalhe={
                              descricaoPgto: null,
                              nomeplanopagamento: null,
                              cdplanopagamento: null,
                              chavepix: null,
                              recebedorpix: null,
                              tipochavepix: null,
                              formapagamento: null,
                              nomeplanopagamento: null
                          }
  
       store.pedido = {pedido: {
                        cdcliente: 0,
                        cdtaxaentrega: 48,
                        cdendereco: 0,
                        datahora_pedido: null,
                        cdplanopagamento: 0,            
                        nomeplanopagamento: '',
                        formapagamento: '',                      
                        obs: '',
                        tipopedido: 0,
                        taxaentrega: 0,
                        valorpedido: 0,
                        valortroco: 0,
                        pedidoitem: [ ]
                    } }
  }
  </script>
  
  <style>
  
  .pgtoSelect {
    background-color: #0d6efd;
    color: white;        
  }
  
  .pgtoNotSelect {
    background-color: white;
                color: black;
  }
  
  </style>