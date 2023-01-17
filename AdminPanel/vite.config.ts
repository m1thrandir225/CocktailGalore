import solid from "solid-start/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    solid({
      appRoot: "./src",
      rootEntry: "./src/root.tsx",
      routesDir: "./src/routes",
      clientEntry: "./src/entry-client.tsx",
      serverEntry: "./src/entry-server.tsx",
    }),
  ],
});
