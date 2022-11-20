<template> 
<div style="padding: 0px 0px 20px 0px; ">
  <div  v-for="(l, index) in store.ingredientesSelecao" :key="index"      
      style=" 
             padding: 0px 0px 5px 10px;
             color: black;
             background-color: white;
             border-bottom: 1px solid Grey;             
      " >            
      
      <div 
      
      style=" 
             display: flex;
             justify-content: space-between;
             "
        @click="selectAdicional(l.cdproduto,l.cdingrediente,l.ingrediente,l.eobrigatorio,index, l.ativo)"             
             >
        <div style="text-align: ; ">
                       
            
            {{l.ingrediente}}   
            <span  
            v-if="l.eobrigatorio">              
            (obrigatório )
            </span>
            <span  
            v-if="l.select">              
             
            </span>
             
      </div>
      <div 
          style="padding: 0px 10px 0px 0px;">
  
        <!--css para selecionado-->
        <div v-if="l.ativo && !l.eobrigatorio"    
           
           style="margin-top: 0px;">
          
            <IconSwitchOn fill="green"/>
        
        </div> 
        <div v-if="(l.eobrigatorio)"                   
            style="margin-bottom: 0px;  ">                  
           <IconSwitchOn fill="green"/>

          
        </div> 
        <div v-if="(!l.eobrigatorio && !l.ativo)"            
        
            style="margin-top: 0px;">                   
            <IconSwitchOff fill="Grey"/>       
        </div> 
 
   
        <!--FIM css para selecionado-->
      </div>
        
   </div> 
  </div> 
</div>

    


</template>

<script setup>
import {indexStore} from '../../stores/index'  
const store = indexStore(); 
 
const props = defineProps({
    cdproduto: Number,
    descricao: String
});

 
const listaAtualIngrediente =  store.ingredientesProduto.filter(g => g.cdproduto == props.cdproduto)


listaAtualIngrediente.forEach(a => {  
 let ingrediente = {
  cdproduto:     a.cdproduto,                    
  cdingrediente: a.cdingrediente,
  ingrediente:   a.ingrediente,
  eobrigatorio:  a.eobrigatorio,
  ativo:         true
 } 
 store.ingredientesSelecao.push(ingrediente)  
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
      
  const selectAdicional = (cdproduto, cdingrediente, ingrediente, eobrigatorio,index, ativo ) => {
console.log(store.ingredientesSelecao)
    if (eobrigatorio) {
      console.log('Obrigatorio não pode retirar')
    }else{
    
        var ingred = ingrediente;
        let indexRegistro = store.ingredientesSelecao.findIndex(obg => obg.ingrediente  == ingred)
        console.log('indice agora é: '+indexRegistro)
        

        if ( !ativo )
            {              
            console.log('colocar ingrediente:  '+cdingrediente + ' ' + ingrediente + ' indexRegistro: '+indexRegistro+' Index '+ index+' ativo: '+ ativo)     
            store.ingredientesSelecao[index].ativo=true
       
              console.log(store.ingredientesSelecao) 
        }else {
          console.log('retirar ingrediente:  '+cdingrediente + ' ' + ingrediente+ ' index: '+indexRegistro+' Index '+ index+' ativo: '+ ativo)
 
          store.ingredientesSelecao[index].ativo=false
          console.log(store.ingredientesSelecao); 
        }
    }
     
   
 }      


</script>

<style>
   
  .classeEnable { 
    background: white;
  }

  .classeDisable {
    background: rgb(233, 232, 231);
    
  }
</style>