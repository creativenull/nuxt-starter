// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-12-02",
  devtools: { enabled: true },
  typescript: { typeCheck: true },
  srcDir: "src/",

  runtimeConfig: {
    public: {
      appName: "Nuxt Starter",
      appUrl: "http://localhost:3000",
    },
    bcryptSaltRounds: 12,
  },

  modules: ["@nuxt/eslint", "@nuxt/ui", "@nuxt/fonts", "@nuxt/image"],
});
