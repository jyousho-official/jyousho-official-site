// @ts-check
import { defineConfig } from "astro/config";

import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { workUrlPlugin } from "./src/plugins/work-url.mjs";

export default defineConfig({
  site: "https://jyoushotku.com",
  server: { host: true, port: 4321 },
  integrations: [sitemap()],
  markdown: {
    processor: satteri({
      mdastPlugins: [workUrlPlugin],
    }),
  },
});
