import { defineConfig } from 'astro/config';
import AutoImport from "unplugin-auto-import/astro";
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
// import Pages from 'vite-plugin-pages';
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  outDir: './dist-static',
  server: {
    port: 8999
  },
  build: {
    targets: ["es2022"]
  },
  integrations: [
    vue(),
    AutoImport({
      resolvers: [ArcoResolver()],
    })],
  vite: {
    build: {
      sourcemap: true
    },
    plugins: [
      vue(),
      Components({
        dts: true,
        resolvers: [
          ArcoResolver({
            sideEffect: true
          })
        ]
      }),
      // Pages({
      //   dirs: 'src/views',
      // }),
    ],
  }
});