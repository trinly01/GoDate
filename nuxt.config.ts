// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  modules: ['dayjs-nuxt', '@nuxt/test-utils/module', "@nuxtjs/i18n"],
  i18n: {
    locales: [
      { code: 'en-US', iso: 'en-US', name: 'English' },
      { code: 'en-AU', iso: 'en-AU', name: 'English' },
      // Add other locales here
    ],
    defaultLocale: 'en-US',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: false,
    },
  }
})