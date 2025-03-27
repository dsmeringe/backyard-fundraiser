// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxt/icon'],

  css: [
    '@/assets/css/global.css'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})