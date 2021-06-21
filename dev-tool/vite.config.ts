import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    react: "reactVendor.React",
    "react-dom": "reactVendor.ReactDOM",
    "@gr-davinci/core": "davinciCore",
    antd: "antd",
    axios: "axios",
    "@tarojs/components": "taroVendor.components",
    "@tarojs/taro": "taroVendor.taro",
    "@tarojs/runtime": "taroVendor.runtime",
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});
