<template>
  <div>
     Telefone ou celular: *
     <div v-if="store.recursos.validaTelefone"
         style="color: red; text-align: center; font-size: 20px;"
     >
       Telefone errado! 
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
</div>

<div style="margin: 10px 0px 0px 0px;">
 <div style="background-color: darkcyan; 
           padding: 10px; width: 100%;            
           border-radius: 5px;
           color: white;
           font-size: 15px;
           text-align: center;
           "
       @click="validaTelefone(store.cliente.fonecel.replace(/[^0-9]/g,''));                
       "
   >            
    Entrar
 </div>
</div>

</template>
 

<script setup>

import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import Telefone from './Telefone.vue'
import axios from 'axios'
import {indexStore} from '../../../stores/index'  
const store = indexStore();

const validaTelefone = (telefone) => {
console.log(' telefone '+telefone+' tem ' + telefone.length  + ' caracteres ')  
if (telefone.length == 11) {
 store.recursos.validaTelefone=false
 getClientePeloFone(telefone)    
}else{
 store.recursos.validaTelefone=true
 getClientePeloFone(telefone)  
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
   store.cliente = response.data.dadoscliente
   store.cliente.fonecel=telefone
   store.cliente.nome=store.cliente.nome
   store.cliente.cdcliente=response.data.dadoscliente.cdcliente
   store.cliente.enderecos = response.data.dadoscliente.enderecos   
   console.log( store.cliente) 
 }else{
   console.log('Não encontrou cliente no telefone: '+telefone)
   console.log(response.data) 
 }   
 
})
.catch(function (error) {
 console.log(error);
});

}


</script>

