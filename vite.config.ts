import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import { UserConfigExport } from "vite"; // 引入 Vite 的 UserConfigExport 类型

// 为默认导出的函数添加类型注释
export default (): UserConfigExport => {
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"

        /*
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
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "arcoblue-6": "#222"
          },
          javascriptEnabled: true
        }
      }
    },
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
      proxy: {}
    }
  };
};
