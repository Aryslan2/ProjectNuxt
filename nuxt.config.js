module.exports = {
  head: {
    title: "InventoSync",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: ["element-ui/lib/theme-chalk/index.css", "@/theme/index.css"],

  loading: { color: "#409EFF" },

  plugins: ["@/plugins/globals", "@/plugins/axios"],

  components: true,

  buildModules: [],

  modules: ["@nuxtjs/axios"],

  axios: {
    baseURL: "http://localhost:3000",
  },

  build: {
    transpile: [/^element-ui/],
  },
};
