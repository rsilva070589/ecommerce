<template>
       <div  class="center"  
            style="color: springgreen;
            font-size: 17px;
            font-weight: bold;
            
            ">  
            <div style=" fill: {{props.cor}}; margin: 0px 10px 0px 10px;">
            
                <i style="color: {{props.cor}};" class="bi bi-laptop"  ></i>        
              
              
            </div>  
          
             <div v-if="store.dadosEmpresa.dadosloja?.statuslojaaberta">
              Delivery Online - ABERTO
             </div>
             <div v-if="!store.dadosEmpresa.dadosloja?.statuslojaaberta">
              Delivery Online - FECHADO
             </div>
             
       </div>

       <div 
            :class="(cor == 'write')? ['temaWrite'] : ['temaBlack']"
            style="
              text-align: center; padding: 0px; display: flex; justify-content: center;">
          <div 
              :class="(cor == 'write')? ['temaWrite'] : ['temaBlack']"
              style="  margin: -2px 10px 0px 10px; width:20px; height:20px">
            <svg   version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"             viewBox="0 0 476.934 476.934" style="enable-background:new 0 0 476.934 476.934;"              xml:space="preserve">                          <g>                <path d="M146.108,308.141c0-40.282-32.772-73.055-73.054-73.055C32.772,235.085,0,267.857,0,308.141                  c0,40.281,32.772,73.053,73.054,73.053C113.336,381.193,146.108,348.422,146.108,308.141z M73.054,355.193                  C47.109,355.193,26,334.086,26,308.141c0-25.946,21.108-47.055,47.054-47.055c25.946,0,47.054,21.107,47.054,47.055                  C120.108,334.086,99,355.193,73.054,355.193z"/>                <path d="M403.879,232.585c-10.086,0-19.7,2.056-28.448,5.768l-20.231-31.43c8.572-7.838,14.901-13.465,16.925-14.947                  c3.728-2.254,6.029-6.303,6.029-10.695v-39.416c0-4.259-2.168-8.225-5.754-10.523c-3.584-2.297-8.094-2.612-11.964-0.835                  l-41.646,19.132l-34.525-48.634c-2.344-3.303-6.143-5.265-10.193-5.265h-30.304c-6.903,0-12.5,5.597-12.5,12.5                  s5.597,12.5,12.5,12.5h23.849l28.056,39.52l-58.94,27.076L180.1,149.982c-1.484-0.979-3.161-1.63-4.917-1.91L75.02,132.117                  c-3.615-0.57-7.297,0.462-10.08,2.836c-2.783,2.375-4.386,5.851-4.386,9.509v25.598c0,3.89,1.811,7.557,4.897,9.922l71.225,54.574                  l44.268,91.92c2.083,4.326,6.46,7.076,11.262,7.076h88.322c0.01,0,0.018,0,0.026,0c0.011,0-9.312,0,0.031,0                  c9.341,0,10.772-4.43,11.508-6.918c0.679-2.301,22.418-81.808,22.418-81.808c7.357-6.948,14.912-14.034,22.045-20.678                  l17.878,27.771c-14.502,13.359-23.607,32.494-23.607,53.719c0,40.281,32.771,73.054,73.054,73.054s73.054-32.771,73.054-73.054                  C476.933,265.358,444.161,232.585,403.879,232.585z M371.978,192.063c-0.202,0.124-0.377,0.214-0.514,0.285                  C371.638,192.257,371.81,192.161,371.978,192.063z M200.06,308.553l-21.217-44.055l62.363,44.055H200.06z M353.154,175.328                  c-14.298,12.057-45.227,41.311-58.357,53.732c-1.659,1.569-2.856,3.563-3.462,5.764l-18.099,65.747l-119.182-84.194L85.554,163.89                  v-4.779l83.032,13.225l60.172,39.69c3.604,2.377,8.178,2.729,12.102,0.924l112.295-51.587V175.328z M403.879,352.693                  c-25.945,0-47.054-21.107-47.054-47.053c0-12.035,4.547-23.023,12.005-31.354l24.538,38.118c2.39,3.712,6.413,5.736,10.521,5.736                  c2.317,0,4.662-0.646,6.754-1.991c5.804-3.737,7.481-11.472,3.745-17.276l-24.556-38.146c4.438-1.391,9.154-2.143,14.045-2.143                  c25.946,0,47.054,21.108,47.054,47.055C450.933,331.586,429.825,352.693,403.879,352.693z"/>              </g>             </svg>      
            </div> 
          
        {{store.dadosEmpresa.dadosloja?.minentrega}}Min - Tempo estimado de entrega <br> 
       </div>

       <div :class="(cor == 'write')? ['temaWrite'] : ['temaBlack']" 
            key="" style="text-align: center; padding: 0px; display: flex; justify-content: center;">
          <div :class="(cor == 'write')? ['temaWrite'] : ['temaBlack']"
                  style="margin: -2px 10px 0px 10px;">
            <svg  width="18px" height="18px"  version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"              viewBox="0 0 33 33" style="enable-background:new 0 0 33 33;" xml:space="preserve">            <g>              <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851                c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369                C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>              <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97                c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97                C22.405,11.151,22.182,11.375,21.905,11.375z"/>            </g>            </svg>
        </div> 
                
       {{store.dadosEmpresa.dadosloja?.minretirada}}Min - Tempo estimado para retirada <br> 
       </div>
  
</template>

<script setup>
 import {indexStore} from '../../stores/index' ;
const store = indexStore(); 

const props = defineProps({
    cor: String
});
</script>

<style>
 .temaWrite {
  color: white;
  fill: white;
  
 }

 .temaBlack {
  color: black;
  fill: black;
 }
</style>