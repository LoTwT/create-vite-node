import { defineConfig } from "vite"
import { VitePluginNode } from "vite-plugin-node"
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [],
  },
  server: {
    port: 3000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "koa",
      appPath: "./app.ts",
    }),
  ],
})
