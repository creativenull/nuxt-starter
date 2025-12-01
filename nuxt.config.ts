// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appName: "Nuxt Starter",
      appUrl: "http://localhost:3000",
    },
    bcryptSaltRounds: 12,
    databaseUrl: "",
  },
  modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxt/image", "nuxt-auth-utils", "nuxt-csurf"],
  css: ["~/assets/css/main.css"],
});
