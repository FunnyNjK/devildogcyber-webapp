import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site = "https://devildogcyber.com";

export default defineConfig({
  site,
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const apexRoot = `${site}/`;
        let url = item.url;
        if (url === site || url === apexRoot) {
          url = apexRoot;
        } else if (url.endsWith("/")) {
          url = url.replace(/\/$/, "");
        }
        return { ...item, url };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
