<template> 
 
<div  v-for="(l, index) in listaGrupoItemAdicional" :key="l.cdproduto"
      :class="{'classeDisable': store.adicionalSelecao.length >= qtdemax && qtdemax > 0 
                            &&   store.adicionalSelecao.filter(g => g.cdgrupoadc == l.cdgrupoadc).length > 0} " 
      style="padding: 0px 0px 0px 0px;  
             color: black;             
      " >                                                
      <div 
      :class="{'classeEnable': l.select && qtdemax > 0}"  
      style=" 
             display: flex;
             justify-content: space-between;             
             border-bottom: 1px solid Grey;
             margin: 0px 0px 0px 0px;
             
      "
      @click="selectAdicional(l.cdproduto,l.precofinalvenda,l.descricaoproduto,index,l.cdgrupoadc,qtdemax)"
      >
        <div style="margin-top: 0px; padding: 5px">
        
            {{l.descricaoproduto}}
                            
            <div style="color: green;">
              <div style="color: green;"> 
                R$  {{store.formataDinheiro( l.precofinalvenda, 2) }}
              </div> 
            </div>       
      </div>
     
        <!--css para selecionado-->
      <div style="padding: 0px 10px 0px 0px">
        <div v-if="store.adicionalSelecao.filter(g => g.cdgrupoadc == l.cdgrupoadc).length    < store.selectItem.qtdemax
                    && qtdemax > 0 
                    && !l.select
                    && store.adicionalSelecao.filter(g => g.cdgrupoadc == l.cdgrupoadc).length == 0
                    "        
            style="margin-top: px;">
           <label class="switch">  
            <IconSwitchOff fill="Grey" class=""/>
           </label>
       </div>
      <div v-if=" l.select  &&
        qtdemax > 0"                    
           style="margin-top: ;">
          <label class="switch" >              
          <IconSwitchOn fill="green"/>
          </label>
      </div> 
   
       <div v-if="(store.adicionalSelecao.length >= qtdemax) 
                  && !l.select
                  && qtdemax > 0
                  && store.adicionalSelecao.filter(g => g.cdgrupoadc == l.cdgrupoadc).length > 0
                  "            
           style="margin-top: ">
          <label class="switch" >   
          <IconSwitchOff fill="Grey"/>
          </label>
      </div>

      <div v-if="qtdemax == 0 && !l.select
      "        
           style="">
          <label class="switch" >   
            <IconSwitchOff fill="Grey"/>
          </label>
      </div>

      <div v-if="qtdemax == 0 && l.select
      " 
                
           style=" ">
          <label class="switch" >   
            <IconSwitchOn fill="green"/>
          </label> 
      </div>
        <!--FIM css para selecionado-->
      </div>
        

   </div> 
  </div> 


</template>

<script setup>
import {indexStore} from '../../stores/index'  
const store = indexStore(); 
 
const props = defineProps({
    cdgrupoadc: Number,
    qtdemin: Number,
    qtdemax: Number,
});

 
 
const grupoItemAdicional = g => g.cdgrupoadc == props.cdgrupoadc
const esabor = g => g.esabor == false

 

const listaGrupoItemAdicional =  store.adicionaisItensProduto.filter(grupoItemAdicional).filter(esabor)

console.log('listaGrupoItemAdicional')
console.log(listaGrupoItemAdicional)

 
      
      
  const selectAdicional = (cdproduto,  precofinalvenda, descricao, index, cdgrupoadc, qtdemax) => {
   
   var numeroARemover = cdproduto;
   let itemExiste = store.adicionalSelecao.findIndex(obg => obg.cdproduto  == numeroARemover)
  
  if (     store.adicionalSelecao.length >= qtdemax
        && qtdemax > 0 
        && store.adicionalSelecao.filter(g => g.cdgrupoadc == cdgrupoadc).length > 0
        && (itemExiste < 0)
  ) {
    console.log('limite atingido')
  }
  else {
    if (itemExiste < 0)
      {        
      console.log('add o item:  '+cdproduto + ' ' + descricao + ' index: '+index+' cdgrupoadc '+cdgrupoadc+ ' qtdemax ' + qtdemax )
          
      store.adicionalSelecao.push(          
                {
                    cdproduto: cdproduto,
                    cdgrupoadc: props.cdgrupoadc,
                    descricao: descricao,
                    observacao: "",
                    isadicionalprod: 's',
                    valorunitario: precofinalvenda,
                    quantidade: 1,
                    valortotal: precofinalvenda * 1,
                    ingredientes: [ ],
                  }
         )
         listaGrupoItemAdicional[index].select=true
        // console.log(store.adicionalSelecao) 
      }else {
        console.log('remove o item:  '+cdproduto + ' ' + descricao)
        listaGrupoItemAdicional[index].select=false
        var numeroARemover = cdproduto;
        var indice = store.adicionalSelecao.findIndex(obg => obg.cdproduto  == numeroARemover)
        store.adicionalSelecao.splice(indice, 1);
        //console.log(store.adicionalSelecao); 
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