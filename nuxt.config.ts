// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxthub/core', '@nuxt/ui-pro', '@clerk/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    apifyToken: process.env.APIFY_TOKEN,
  },
  clerk: {
    skipServerMiddleware: true,
  },
});
