export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'Amin Dordaneh | Senior Full-Stack Engineer',
      meta: [
        { name: 'description', content: 'Portfolio of Amin Dordaneh - Senior Full-Stack Developer specialized in Vue.js, Nuxt.js & Custom PHP' }
      ]
    }
  },
  nitro: {
    preset: 'github-pages'
  }
})