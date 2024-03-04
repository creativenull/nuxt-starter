// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css",
        },
      ],
    },
  },

  runtimeConfig: {
    sessionKey: "",
    saltRounds: 0,
    sqliteFilepath: "",
  },

  modules: ["@pinia/nuxt"]
});