import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
 
import { createApp } from 'vue'
import App from './App.vue' 
import router from './router' 
import { createPinia } from 'pinia'  
import { VMaskDirective } from "v-slim-mask";
import VueTheMask from 'vue-the-mask'



createApp(App) 
              .use(router)
              .use(createPinia()) 
              .use(VueTheMask)                            
              .mount('#app')
              