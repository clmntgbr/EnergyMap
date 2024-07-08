// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/leaflet"],
  runtimeConfig: {
    public: {
      api: "",
      api_url: "",
    },
  },
});
