import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    // base: "./", //等同于  assetsPublicPath :'./'
    plugins: [
        vue(),
    ],
    // resolve: {
    //     alias: {
    //         "@": path.resolve(__dirname, "src"),
    //         "view": path.resolve(__dirname, "src/view"),
    //         "components": path.resolve(__dirname, "src/components"),
    //         "assets": path.resolve(__dirname, "src/assets"),
    //         "store": path.resolve(__dirname, "src/store"),
    //         "mixins": path.resolve(__dirname, "src/mixins"),
    //     },
    // },
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: '@import "./src/assets/styles/common.scss";'
    //         }
    //     }
    // },
    server: {
        host: "0.0.0.0",
    },
});


