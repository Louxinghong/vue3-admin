import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";

export default () => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"

        /**
         * 自定义插入位置
         * @default: body-last
         */
        // inject?: 'body-last' | 'body-first'

        /**
         * custom dom id
         * @default: __svg__icons__dom__
         */
        // customDomId: '__svg__icons__dom__',
      })
    ],
    resolve: {
      alias: {
        path: "path-browserify",
        "@": resolve(__dirname, "src")
      }
    },
    base: "/vue3-admin/",
    build: {
      outDir: "docs"
    },
    server: {
      port: 4000,
      open: true,
      cors: true,
      proxy: {
        "/qingyunke-api": {
          target: "http://api.qingyunke.com/api.php",
          changeOrigin: true,
          ws: true
          // rewrite: (path: string) => path.replace(/^\/api/, '')
        },
        "/bilibili-api": {
          target: "https://api.bilibili.com",
          changeOrigin: true,
          ws: true
        },
        "/ai-api": {
          target: "https://api.chatanywhere.tech",
          changeOrigin: true,
          ws: true
        }
      }
    }
  };
};
