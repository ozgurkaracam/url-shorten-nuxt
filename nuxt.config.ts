// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss','@nuxtjs/supabase'
      ],
      ssr:true,
      app:{
        head:{
          title:"Shorten!"
        }
      },
      buildModules:['@nuxtjs/fontawesome']
})
