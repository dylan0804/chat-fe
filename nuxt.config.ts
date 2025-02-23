// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      websocket: true
    }
  },
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/ui'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL
    }
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})