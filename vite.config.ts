import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/vtstore.ts"),
      name: "vtstore"
    }
  }
})
