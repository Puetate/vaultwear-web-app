import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['dayjs'],
  },
  plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routeFileIgnorePrefix: "@",
      routeToken: "layout",
      quoteStyle: "double",
    }),
    viteReact(),
    tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
      'mantine-react-table-table': 'mantine-react-table/dist/index.esm.mjs',
    },
  }
});
