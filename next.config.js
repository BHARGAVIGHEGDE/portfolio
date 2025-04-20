/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import WithPWA from "next-pwa";

const withPWA = WithPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true,
  scope: "/",
  sw: "service-worker.js",
  buildExcludes: [/workbox-.*\.js$/], // Exclude workbox files from being bundled
});

/**
 * @type {import('next').NextConfig}
 */
// @ts-ignore
const config = withPWA({
  reactStrictMode: true,

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

 webpack: (config) => {
  if (!Array.isArray(config.externals)) {
    config.externals = []; // Ensure it's an array
  }
  
  config.externals.push("workbox"); // Adding "workbox" correctly
  
  return config;
}

});

export default config;