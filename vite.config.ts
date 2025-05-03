import { defineConfig } from "vite";
import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Slack Image Downloader",
  version: "1.0.0",
  description: "Download images posted in the currently open channel in Slack",
  permissions: ["storage", "downloads", "activeTab"],
  host_permissions: ["https://files.slack.com/*"],
  action: {
    default_title: "Slack Image Downloader",
    default_popup: "src/popup.html",
  },
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["https://*.slack.com/*"],
      js: ["src/content.tsx"],
    },
  ],
});

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  build: {
    minify: "terser",
    rollupOptions: {
      input: {
        content: "src/content.tsx",
        background: "src/background.ts",
        popup: "src/popup.html",
      },
    },
  },
  optimizeDeps: {
    include: ["lucide-react"],
    exclude: ["lucide-react/icons"],
  },
});
