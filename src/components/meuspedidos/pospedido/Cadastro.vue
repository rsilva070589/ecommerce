<template>

  <div style="color: white; padding-top: 30px;">
   
  </div>


<div v-if="!store.recursos.carregando">
  <div style="color: white;  
              margin-top: 0px;            
              padding: 0px 10px 10px 10px; 
              width: 100%;                
              font-size: 13px;
  "       
  >

  <div   
        v-if="store.cliente.cdcliente > 0"
              style="font-size: 20px; 
              text-align: center;           
              "              >
    CONFIRA SEUS DADOS
  </div>
  
  <div  
        v-if="store.cliente.cdcliente == 0"
              style="font-size: 20px; 
              text-align: center;              
              ">
    CADASTRE-SE AQUI
  </div>

  <div  >
    Nome: *  
    <div v-if="store.validation.nome && store.cliente.nome.length < 1" 
      style="color: red; font-size: 20px;
      background-color: white;
      width: 100%;
      height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;
      ">
      NOME É OBRIGATÓRIO! *
    </div>
    <div >
      <input style="width: 100%; 
                    height: 40px;
                    border-radius: 5px;
                    font-size: 20px;
                                  
                    " 
                    placeholder=" Nome Completo"
              v-model="store.cliente.nome"      
              type="text">
    </div>    
  </div>
  <br>
  <div>
    
    <div v-if="store.validation.telefone && store.cliente.fonecel.length < 1"
    style="color: red; font-size: 20px;
      background-color: white;
      width: 100%;
      height: 30px;
      text-align: center;
      font-weight: bold;
      border-radius: 5px;"
    >
    TELEFONE É OBRIGATÓRIO! *
    </div>
    <div>
      <input  
      placeholder=" Telefone / Celular"
      style="width: 100%; 
                    height: 40px;
                    border-radius: 5px;
                    font-size: 20px;
             "
            v-model="store.cliente.fonecel" 
            v-mask="'(##) # ####-####'" 
            type="tel"               
                  />
    </div>        
  <div>
  
</div>
  </div>
  <div style="color: white;              
              padding: 15px; 
              width: 100%;                
              font-size: 11px;
              text-align: center;
  "  >
    Ao informar meus dados, eu concordo com os Termos de Uso e Politica de Privacidade
  </div>
      
  </div>

 <!--Button Avançar-->
 <div class="" style="position: fixed; 
                         width: 100%;
                         bottom: 0;
                         
                         ">

   <div style="display: flex; justify-content: center; padding: 6px; margin: 0px 7px 5px 7px;">
    <button
              type="button" 
              class="btn btn-success btn-lg btn3d"
              style="width: 100%;     
                margin: 0px 0px 0px 0px;       
              "    
			    @click="validacao(); "
              >
              <span class="glyphicon glyphicon-ok"></span> 
              > Avançar
        </button>
     </div>  
   <!--Botoes-->   

    </div>
 
       <!--Fim Button Avançar-->

 
</div>

<div>
  <Carregando />
</div>


 
 
</template>

<script setup>
import Carregando from '../../content/Carregando.vue'
import axios from 'axios'
import {indexStore} from '../../../stores/index'  
const store = indexStore();



const validacao = () => {
  
 
  var telefone = store.cliente.fonecel.replace(/[^0-9]/g,'')

  console.log(' telefone '+telefone +' tem ' + telefone.length + ' caracteres ')  

  console.log('qtde de caracteres' + store.cliente.nome.length)
  if ( store.cliente.nome.length < 3 ) {
      console.log('Erro Nome')
      store.validation.nome = true      
  }else{
    console.log('Nome ok')
    store.validation.nome = false
    
  }


  if (telefone.length == 11) {
    store.validation.telefone=false
    if(store.cliente.nome.length > 2 ) {
      getClientePeloFone(telefone)   
      store.recursos.carregando = true
    }
     
  }else{
    store.validation.telefone=true   
  }
}

var getClientePeloFone = (telefone) => {
  var data = JSON.stringify({
  "databasecliente": store.recursos.databasecliente,
  "telefone": telefone
  });

  var config = {
    method: 'post',
    url: 'https://easypedidos.sytes.net:8082/evento/getdadosvalidatelefone',
    headers: { 
      'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    if (response.data.sucess=='true') { 
      store.cliente.fonecel=telefone      
      store.cliente.cdcliente=response.data.dadoscliente.cdcliente
      store.cliente.enderecos = response.data.dadoscliente.enderecos
      console.log( store.cliente)
      createUpdateCliente(telefone)
    }else{
      console.log('Não encontrou cliente no telefone: '+telefone)
      console.log(response.data)
      createUpdateCliente(telefone)
    }   
    
  })
  .catch(function (error) {
    console.log(error);
  });

}
 
 

 
var createUpdateCliente = (telefone)=> {
 console.log('codigo do cliente atual' + store.cliente.cdcliente)
 
  if (store.cliente.cdcliente > 0 ) {
    console.log('Tipo de Entrega é: '+store.selectItem.tipoEntrega)
console.log('nome do cliente indo para UPDATE: '+store.cliente.nome)

    // colocar codigo de update cliente
    var data = JSON.stringify({
    "databasecliente": store.recursos.databasecliente,
    "fonecel": telefone,
    "cdcliente": store.cliente.cdcliente,
    "nome": store.cliente.nome
      });

      var config = {
        method: 'put',
        url: 'https://easypedidos.sytes.net:8082/evento/setdadoscliente',
        headers: { 
          'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {        
        console.log(JSON.stringify(response.data));
        store.cliente.cdcliente = response.data.cdcliente
        console.log('Atualizado Cliente agora: '+store.cliente.cdcliente)
        validaEndreco()
      })
      .catch(function (error) {
        console.log(error);
      });
 

   

  } else {

    

    //codigo create cliente
      var data = JSON.stringify({
    
    "databasecliente": store.recursos.databasecliente,
    "fonecel": telefone,    
    "nome": store.cliente.nome

      });

      var config = {
        method: 'post',
        url: 'https://easypedidos.sytes.net:8082/evento/setdadoscliente',
        headers: { 
          'Authorization': 'Basic dGVzdHNlcnZlcjp0ZXN0c2VydmVy', 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
      .then(function (response) {        
        
        store.cliente.cdcliente = response.data.cdcliente
        //store.cliente.nome = response.data.nome
        console.log('cd cliente cadastrado agora: '+store.cliente.cdcliente) 
        validaEndreco()
      })
      .catch(function (error) {
        console.log(error);
      });
 
    
 
  }
}

var validaEndreco = ()=> { 
  console.log(store.cliente.nome.length)
  console.log(store.selectItem.tipoEntrega)
 

  if (store.selectItem.tipoEntrega == 1 && store.cliente.nome.length > 2) {    
    store.recursos.etapaPedido=99;
    store.recursos.telaAtualNome='FINALIZAR PEDIDO';
    store.recursos.telaContentAtual='FINALIZAR';
    console.log('Retirada na LOJA, nao precisa de endereço, finalizar pedido')
    store.recursos.carregando=false
   
  } else { 
    console.log('qtde de endereço do cliente: '+store.cliente.enderecos.length)
    if (  store.cliente.nome.length > 2
       &&!store.cliente.enderecos[store.selectItem.indexEndereco]?.cdcliente_end  > 0  
       && store.selectItem.tipoEntrega == 2  
    ) { 
      store.recursos.etapaPedido=99;
      store.recursos.telaAtualNome='CADASTRAR ENDEREÇO';
      store.recursos.telaContentAtual='ENDERECO';
      console.log('Entrega em Domicilio, precisa cadastrar um endereço')
      store.recursos.carregando=false
     
    }     
    if (store.cliente.enderecos[store.selectItem.indexEndereco]?.cdcliente_end  > 0  
     && store.cliente.nome.length > 2) {
      store.recursos.etapaPedido=99;
    store.recursos.telaAtualNome='FINALIZAR PEDIDO';
    store.recursos.telaContentAtual='FINALIZAR';
    console.log('Delivery, cliente ja tem endereço, finalizar pedido')
    store.recursos.carregando=false
    
    }
        
  }
  
}


</script>

<style>

</style>