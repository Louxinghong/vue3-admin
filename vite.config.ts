import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { resolve } from "path";
import { UserConfigExport } from "vite"; // 引入 Vite 的 UserConfigExport 类型
import tailwindcss from "@tailwindcss/vite";
import Components from "unplugin-vue-components/vite";

// 为默认导出的函数添加类型注释
export default (): UserConfigExport => {
  return {
    plugins: [
      vue(),
      tailwindcss(),
      Components({
        // 文件扩展名
        dirs: ["src/components/*/"],
        // 文件扩展名
        extensions: ["vue"],
        // 不深度搜索子目录
        deep: false,
        // 生成类型声明文件
        dts: "src/types/components.d.ts",
        // 目录名作为组件名
        directoryAsNamespace: false,
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), "src/assets/icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",

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
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            "arcoblue-6": "#222",
          },
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: {
        path: "path-browserify",
        "@": resolve(__dirname, "src"),
      },
    },
    base: "/vue3-admin/",
    build: {
      outDir: "docs",
    },
    server: {
      port: 4000,
      open: true,
      cors: true,
      proxy: {},
    },
  };
};
