import { resolve } from 'path'

export default {
  alias: {
    '@': resolve(__dirname, '/'),
  },
  modules: ['nuxt-icon'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  nitro: {
    preset: 'vercel-edge',
  },
};
