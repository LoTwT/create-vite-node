import { defineConfig, loadEnv } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import path from "path";

export default defineConfig((config) => {
  const { mode } = config;

  // .env
  const root = process.cwd();
  const { VITE_SERVER_PORT } = loadEnv(mode, root) as unknown as ImportMetaEnv;

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    optimizeDeps: {
      include: [],
    },

    server: {
      port: VITE_SERVER_PORT || 3000,
    },

    plugins: [
      ...VitePluginNode({
        adapter: "koa",
        appPath: "./src/app.ts",
      }),
    ],
  };
});

// 环境变量
// https://cn.vitejs.dev/guide/env-and-mode.html#intellisense
interface ImportMetaEnv {
  readonly VITE_SERVER_PORT: number;
}
