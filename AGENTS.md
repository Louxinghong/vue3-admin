# AGENTS.md — vue3-admin

## ⚠️ 开始任何任务前必须先阅读项目规范

在开始任何开发任务之前，**必须先读取并理解** [`.superpowers/specs/project-spec.md`](.superpowers/specs/project-spec.md) 中的项目规范文档。了解当前工作上下文、迭代目标、功能清单后再执行。

---

## 项目概述

基于 Vue 3 + Vite + TypeScript 的后台管理系统。UI 框架使用 **Arco Design Vue**，状态管理使用 **Pinia**，路由使用 **Vue Router**，样式使用 **Tailwind CSS** + **Less**。

## 技术栈

| 层级 | 技术 |
|---|---|
| 框架 | Vue 3.5（Composition API，`<script setup>`） |
| 构建 | Vite 4 |
| 语言 | TypeScript（strict 模式，`ESNext`） |
| UI 组件 | Arco Design Vue 2.45 |
| 状态管理 | Pinia + pinia-plugin-persistedstate |
| 路由 | Vue Router 4 |
| 网络请求 | Axios（封装在 `@/utils/axios.ts`） |
| 样式 | Tailwind CSS 4 + Less（Arco 主题覆盖） |
| 图标 | SVG Sprite（`vite-plugin-svg-icons`） |
| 自动导入 | `unplugin-vue-components` + `unplugin-auto-import` |
| 格式化 | Prettier |

## 常用命令

```bash
pnpm dev          # 启动开发服务器（端口 4000，自动打开）
pnpm build        # 生产构建 → docs/
pnpm preview      # 预览生产构建
pnpm gen:schema   # 通过 tsx 生成 OpenAPI 类型
```

## 目录结构

```
src/
├── api/              # API 接口模块（axios 请求）
├── assets/           # 静态资源：图片、SVG 图标
├── components/       # 通用组件（按目录自动导入）
├── hooks/            # 组合式函数（useTable、useCalculate）
├── router/           # 路由配置，按功能拆分
├── store/            # Pinia 状态管理（持久化插件）
├── style/            # 全局样式（Tailwind + common Less）
├── types/            # TypeScript 类型声明
├── utils/            # 工具函数：axios 封装、权限、localStorage、地图工具
└── views/            # 页面级组件（每个路由一个目录）
```

## 开发规范

### 路径别名

`@/` 映射到 `src/`，所有内部引用统一使用此别名。

### 组件规范

- 所有单文件组件使用 `<script setup lang="ts">` 语法。
- `src/components/*/` 下的组件自动导入，无需手动 `import`。
- 页面组件放在 `src/views/<功能名>/index.vue`。

### 状态管理

- Pinia 使用持久化插件（`pinia-plugin-persistedstate`）。
- Pinia state 中使用 `Record` 而非 `Map`，因为 Map 无法正确序列化为 JSON。

### 样式规范

- Arco Design 主题通过 [vite.config.ts](vite.config.ts) 中的 Less `modifyVars` 定制。
- 工具类使用 Tailwind CSS。
- 全局样式在 [src/style/common.less](src/style/common.less)。

### API 规范

- 网络请求统一通过 `@/utils/axios.ts` 的 Axios 封装层发起。
- 接口按功能模块组织在 `src/api/` 下。

## 路由

路由按功能拆分到 `src/router/routes/` 目录下的文件，在 `src/router/index.ts` 中统一组装。新增路由时在该目录创建文件并导入。

## 构建输出

生产构建输出到 `docs/` 目录（兼容 GitHub Pages），基础路径为 `/vue3-admin/`。
