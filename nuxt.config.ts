// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: { typeCheck: true },

  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.colors.min.css",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      appName: "",
    },
    sessionKey: "",
    saltRounds: 0,
    sqliteFilepath: "",
  },
});
