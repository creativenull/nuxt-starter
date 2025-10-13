// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-10-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      appName: "Nuxt Starter",
      appUrl: "http://localhost:3000",
    },
    bcryptSaltRounds: 12,
    databaseDriver: "better-sqlite3",
    databaseUrl: "",
  },
  modules: [
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/image",
    "nuxt-auth-utils",
    "nuxt-csurf",
  ],
  experimental: { watcher: "parcel" },
  css: ["~/assets/css/main.css"],
});
