import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import nodePolyFills from "vite-plugin-node-stdlib-browser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyFills()],
});
