export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/leaflet",
  ],
  build: {
    transpile: [],
  },
  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  runtimeConfig: {
    public: {
      api: "",
      api_url: "",
      default: { type: "", longitude: "", latitude: "", radius: "" },
    },
  },
});
