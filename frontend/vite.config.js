import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, //fundamental for deploying in container with docker
    port: 8000, //should read it from docker-compose's env (shared with backend)
  },
  commonjsOptions: {
    esmExternals: true,
  },
  //for google maps (see https://github.com/fawmi/vue-google-maps/issues/148#issuecomment-1235143844)
  optimizeDeps: {
    include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
  },
});
