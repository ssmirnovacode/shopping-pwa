import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "pwa-192x192.png", "pwa-512x512.png"],
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
      },
      workbox: {
        globPatterns: [], // ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: null,
        navigateFallbackAllowlist: [/^(?!\/__).*/],
        offlineGoogleAnalytics: false,
        runtimeCaching: [
          // Handle ALL navigation requests (this replaces navigateFallback)
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "navigation-cache",
              networkTimeoutSeconds: 3,
              matchOptions: {
                ignoreSearch: true,
              },
              plugins: [
                {
                  cachedResponseWillBeUsed: async ({ cachedResponse }) => {
                    // If we have a cached response, use it
                    if (cachedResponse) {
                      return cachedResponse;
                    }
                    // Otherwise, let NetworkFirst handle it
                    return null;
                  },
                },
              ],
            },
          },
        ],
      },
      manifest: {
        name: "Shopping PWA",
        short_name: "ShoppingPWA",
        description: "Shopping list app",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    host: true,
  },
});
