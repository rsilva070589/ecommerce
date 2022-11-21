<template>

     
        <div style="margin-top: 60px; margin-bottom: 30px;"    >

            <div class="container">
                <div style="text-align: center;">
                    Bairros de entrega
                </div>                
                <div v-for="(b, indexB) in store.bairros.bairros" :key="indexB"
                    style="border-bottom: 1px solid Grey;
                            display: flex;
                            justify-content: space-between;
                            margin-left: 20px;
                            margin-right: 20px;
                            font-size: 12px;
                    "
                >
                    <div>
                        {{b.bairro}} 
                    </div> 
                    
                    <div>
                        R${{store.formataDinheiro(b.valorentrega, 2)}}
                    </div>
                    
                </div>
            </div>
         </div>
     
    
</template>

<script setup>
import {indexStore} from '../../../stores/index'  
const store = indexStore(); 

 

</script>

<style>

</style>