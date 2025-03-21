// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
      },
    },
  },
  modules: ['@pinia/nuxt'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  css: [
    '~/assets/css/reset.css',
    '~/assets/css/layout.css',
    '~/assets/css/musign.css',
    '~/assets/css/main.css',
    '~/assets/css/layout_respon.css',
    '~/assets/css/dev.css',
    '~/assets/css/main_respon.css',
  ],
  devtools: { enabled: true },
});
