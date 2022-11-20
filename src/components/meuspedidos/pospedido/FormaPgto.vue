<template>
    
  <div class="card"
            style="    background-color: #0d6efd;
               border-radius: 5px;
               color: black;
               margin: 0px 0px 0px 0px;
               padding: 7px 7px 27px 7px;               
               background-color: white;
            ">


    <div v-if="store.formaPgtoDetalhe.formapagamento=='Pix'"
     style="font-size: 15px; display: flex; justify-content: center;  height: 65px;
     margin-top: -5px;
     ">
        
     <div style="display: block; "
        @click="copyPix()"
     >       
        
        <div >
            Nome: {{store.formaPgtoDetalhe.recebedorpix}}
        </div>
        <div style="display: flex;" >
            Pix: {{store.formaPgtoDetalhe.chavepix}}   
         
        </div>
        <div>
            Tipo chave: {{store.formaPgtoDetalhe.tipochavepix}}
        </div>
        
        <div style="display: flex;">
            <div 
                :class="(store.recursos.copyPix) ? ['copySucess'] : ['']"
                    @click="copyPix()"
                    style="width: 20px; margin-left: 0px; "
                    >
               <IconCopy /> 
            </div> 
                <span v-if="!store.recursos.copyPix" style="">
                Copiar Chave 
                </span>
               <span v-if="store.recursos.copyPix" style="color: green">
                Chave Copiada
               </span>
        
            </div>
        
        
     
            

     </div>
        
    </div>

    <div v-if="store.formaPgtoDetalhe.formapagamento=='Dinheiro'">
        <div style="text-align: center;  font-size: 15px; height: 60px;">
            Troco para quanto?
            <div> 
                <input v-model="store.selectItem.valortroco" 
                type="number"   >
            </div>           
     
        </div>           

    </div>
       
    <div  v-if="store.formaPgtoDetalhe.formapagamento!='Dinheiro'
            && store.formaPgtoDetalhe.formapagamento!='Pix'
    ">
        <div style="text-align: center;
                    font-size: 15px;
                    padding-top: 15px;
                    height: 60px;
                    ">
    
            <div> 
                    {{store.formaPgtoDetalhe.nomeplanopagamento}}
            </div>            
        </div>           

    </div>

    
  </div>
</template>

<script setup>
import {indexStore} from '../../../stores/index'  
import IconCopy from '../../icons/IconCopy.vue';
const store = indexStore(); 

 const props = defineProps ({
    nomeplanopagamento: String,
    cdplanopagamento: Number,
    chavepix: String,
    recebedorpix: String,
    formapagamento: String,
    nomeplanopagamento: String
 })

 const copyPix = () => {
    var text = store.formaPgtoDetalhe.chavepix;
    navigator.clipboard.writeText(text).then(function() {
    store.recursos.copyPix = true    
    console.log(text + ' Copiado Chave PIX com Sucesso! ' );
    }, function(err) {
    console.error('Erro ao copiar Chave PIX: ', err);
    });
 }

 

</script>

<style>
.copySucess{
    fill: green;
}
</style>