import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import {BootstrapVue3Resolver} from 'unplugin-vue-components/resolvers'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
 
  plugins: [
            vue(),
            //basicSsl(),
            Components({
              resolvers: [BootstrapVue3Resolver()]
            })
          ]
})

 