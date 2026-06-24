# Vue3 Admin 项目规范文档

## 1. 项目概述

### 1.1 项目简介

本项目是一个基于 Vue 3 + TypeScript 的后台管理系统模板，采用现代化技术栈，提供完整的开发规范和最佳实践。

### 1.2 技术栈

| 分类        | 技术            | 版本    |
| :---------- | :-------------- | :------ |
| 框架        | Vue             | ^3.5.12 |
| 语言        | TypeScript      | ^5.9.3  |
| 构建工具    | Vite            | ^4.5.14 |
| 组件库      | Arco Design Vue | ^2.45.0 |
| 状态管理    | Pinia           | ^2.0.32 |
| 路由        | Vue Router      | ^4.1.6  |
| 样式        | Tailwind CSS    | ^4.1.17 |
| 样式预处理  | Less            | ^4.2.2  |
| HTTP 客户端 | Axios           | ^1.3.4  |
| 代码格式化  | Prettier        | ^2.8.4  |

---

## 2. 目录结构

```
vue3-admin/
├── src/                    # 源代码目录
│   ├── api/                # API 接口定义
│   ├── assets/             # 静态资源
│   │   ├── icons/          # SVG 图标
│   │   └── images/         # 图片资源
│   ├── components/         # 公共组件
│   │   ├── Layout/         # 布局组件
│   │   └── ...             # 其他组件
│   ├── hooks/              # 自定义 Hooks
│   ├── router/             # 路由配置
│   │   └── routes/         # 路由定义文件
│   ├── store/              # Pinia 状态管理
│   │   └── modules/        # 状态模块
│   ├── style/              # 全局样式
│   ├── types/              # TypeScript 类型定义
│   ├── utils/              # 工具函数
│   ├── views/              # 页面视图
│   ├── App.vue             # 根组件
│   ├── main.ts             # 入口文件
│   └── env.d.ts            # 环境变量声明
├── public/                 # 公共静态资源
├── openspec/               # OpenSpec 规范文档
│   ├── changes/            # 变更记录
│   ├── config.yaml         # 配置文件
│   └── specs/              # 规范文档
├── scripts/                # 脚本文件
├── docs/                   # 构建产物（gh-pages）
├── package.json            # 依赖配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── tailwind.config.ts      # Tailwind 配置
└── .prettierrc             # Prettier 配置
```

### 2.1 目录职责说明

| 目录             | 职责             | 说明                                |
| :--------------- | :--------------- | :---------------------------------- |
| `api/`           | API 接口统一管理 | 存放所有后端接口调用函数            |
| `assets/icons/`  | SVG 图标资源     | 使用 vite-plugin-svg-icons 自动注册 |
| `assets/images/` | 图片资源         | 存放项目所需的图片文件              |
| `components/`    | 可复用组件       | 公共组件，按功能模块划分            |
| `hooks/`         | 自定义 Hooks     | 封装可复用的业务逻辑                |
| `router/`        | 路由管理         | 路由配置和权限控制                  |
| `store/`         | 状态管理         | Pinia store 模块                    |
| `style/`         | 全局样式         | 公共样式和主题配置                  |
| `types/`         | 类型定义         | TypeScript 类型声明文件             |
| `utils/`         | 工具函数         | 通用工具方法                        |
| `views/`         | 页面视图         | 路由对应的页面组件                  |

---

## 3. 命名规范

### 3.1 文件命名

| 类型       | 规则            | 示例                                 |
| :--------- | :-------------- | :----------------------------------- |
| 组件文件   | PascalCase      | `NavBar.vue`, `SideBar.vue`          |
| 工具函数   | kebab-case      | `axios.ts`, `tool.ts`                |
| 类型定义   | kebab-case      | `commonConfig.d.ts`, `test.d.ts`     |
| 路由配置   | kebab-case      | `dashboard.ts`, `user-management.ts` |
| Store 模块 | kebab-case      | `status.ts`, `router-tag.ts`         |
| Hook 文件  | use-pascal-case | `useTable.ts`, `useCalculate.ts`     |

### 3.2 变量命名

| 类型      | 规则               | 示例                                 |
| :-------- | :----------------- | :----------------------------------- |
| 普通变量  | camelCase          | `userName`, `isMobile`               |
| 常量      | UPPER_CASE         | `MOBILE_WIDTH`, `API_BASE_URL`       |
| Ref 变量  | camelCase + 语义化 | `const isCollapsed = ref(false)`     |
| 函数/方法 | camelCase          | `changeSideBarStatus`, `getViewData` |
| 接口/类型 | PascalCase         | `interface UserInfo`, `type Config`  |

### 3.3 组件命名

- **组件名**: PascalCase，使用完整单词描述
- **目录名**: 与组件名一致（PascalCase）
- **示例**:
  - 目录: `src/components/NavBar/`
  - 文件: `NavBar.vue`

---

## 4. 编码规范

### 4.1 TypeScript 配置

项目使用严格模式，关键配置如下：

```json
{
  "strict": true,
  "module": "ESNext",
  "moduleResolution": "bundler",
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
}
```

### 4.2 Prettier 配置

| 配置项           | 值    | 说明            |
| :--------------- | :---- | :-------------- |
| `useTabs`        | false | 使用空格缩进    |
| `tabWidth`       | 2     | 缩进为 2 个空格 |
| `printWidth`     | 100   | 每行最大字符数  |
| `singleQuote`    | false | 使用双引号      |
| `trailingComma`  | all   | 尾随逗号        |
| `semi`           | true  | 使用分号        |
| `bracketSpacing` | true  | 对象字面量空格  |

### 4.3 代码风格

#### 4.3.1 组件写法

- **模板**: 使用 `<template>` 标签，组件选项使用 `<script lang="ts" setup>`
- **脚本**: 使用 Composition API，避免 Options API
- **样式**: 使用 `<style lang="less" scoped>`，避免全局样式污染

```vue
<template>
  <div :class="['layout', isCollapsed ? 'collapsed' : '']">
    <side-bar></side-bar>
    <main-container></main-container>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import SideBar from "./SideBar.vue";
import MainContainer from "./MainContainer.vue";

const isCollapsed = ref(false);

onMounted(() => {
  // 初始化逻辑
});
</script>

<style lang="less" scoped>
.layout {
  display: flex;
}
</style>
```

#### 4.3.2 函数写法

- 函数参数和返回值必须有类型注解
- 复杂函数需要添加 JSDoc 注释

```typescript
/**
 * 获取高德地图加载结果
 * @param params 地图参数配置
 * @returns AMap 实例
 */
export const getAMapData = (params: CommonConfig.MapParams = {}) => {
  AMapLoader.reset();
  return AMapLoader.load({
    key: "your-key",
    version: params.mapVersion || "2.0",
    plugins: params.mapPlugins || [],
  });
};
```

#### 4.3.3 Store 写法

使用 Pinia 的 Composition API 风格：

```typescript
import { defineStore } from "pinia";
import { ref } from "vue";

const useStatusStore = defineStore(
  "status",
  () => {
    const isCollapsed = ref<boolean>(false);

    const changeSideBarStatus = (status: boolean) => {
      isCollapsed.value = status;
    };

    return {
      isCollapsed,
      changeSideBarStatus,
    };
  },
  {
    persist: true,
  },
);

export default useStatusStore;
```

---

## 5. 路由规范

### 5.1 路由定义

路由配置文件位于 `src/router/routes/` 目录，每个文件导出一个 `routes` 数组：

```typescript
import type { RouteRecordRaw } from "vue-router";

export const routes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/index.vue"),
  },
];
```

### 5.2 路由命名

- `path`: 使用 kebab-case，如 `/user-management`
- `name`: 使用 PascalCase，如 `UserManagement`

### 5.3 权限控制

路由权限通过 `src/utils/permission.ts` 统一处理。

---

## 6. 样式规范

### 6.1 Tailwind CSS

项目使用 Tailwind CSS 4.x，直接在组件中使用 Tailwind 类名：

```vue
<template>
  <div class="flex items-center justify-between p-4 bg-gray-50">
    <span class="text-lg font-bold">Title</span>
  </div>
</template>
```

### 6.2 Less 样式

复杂样式使用 Less，通过 scoped 隔离：

```vue
<style lang="less" scoped>
.layout {
  .side-bar {
    width: 55px;
  }

  .main-container {
    flex: 1;
  }
}
</style>
```

### 6.3 主题变量

主题变量统一在 `vite.config.ts` 中配置：

```typescript
css: {
  preprocessorOptions: {
    less: {
      modifyVars: {
        "arcoblue-6": "#222",
      },
    },
  },
}
```

---

## 7. API 规范

### 7.1 接口定义

所有 API 接口统一在 `src/api/index.ts` 中定义：

```typescript
import axios from "@/utils/axios";

export const getViewData = () => axios.get("/api/view");

export const getUserList = (params: UserQuery) => axios.get("/api/users", { params });
```

### 7.2 错误处理

使用 Axios 拦截器统一处理错误：

```typescript
service.interceptors.response.use(
  (result) => result.data,
  (error) => {
    Message.error(error.message);
    return Promise.reject(error);
  },
);
```

---

## 8. 状态管理规范

### 8.1 Store 结构

每个 Store 模块对应一个业务领域：

```typescript
// src/store/modules/status.ts
const useStatusStore = defineStore("status", () => {
  // state
  const isCollapsed = ref(false);

  // actions
  const changeSideBarStatus = (status: boolean) => {
    isCollapsed.value = status;
  };

  return {
    isCollapsed,
    changeSideBarStatus,
  };
});
```

### 8.2 Store 使用

```typescript
import useStatusStore from "@/store/modules/status";
import { storeToRefs } from "pinia";

const statusStore = useStatusStore();
const { isCollapsed } = storeToRefs(statusStore);

statusStore.changeSideBarStatus(true);
```

---

## 9. 开发流程

### 9.1 命令说明

| 命令                 | 说明                  |
| :------------------- | :-------------------- |
| `npm run dev`        | 启动开发服务器        |
| `npm run build`      | 生产构建              |
| `npm run preview`    | 预览构建结果          |
| `npm run gen:schema` | 生成 OpenAPI 类型定义 |

### 9.2 代码提交

使用 Conventional Commits 规范：

- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构代码
- `test`: 测试相关

---

## 10. 部署规范

### 10.1 构建配置

构建产物输出到 `docs/` 目录，用于 GitHub Pages 部署：

```typescript
// vite.config.ts
build: {
  outDir: "docs",
},
base: "/vue3-admin/",
```

### 10.2 环境变量

使用 `.env` 文件管理环境变量，通过 `import.meta.env` 访问。

---

## 附录

### A. 工具函数目录

| 文件              | 功能         |
| :---------------- | :----------- |
| `axios.ts`        | Axios 封装   |
| `enumOptions.ts`  | 枚举选项     |
| `interface.ts`    | 接口类型定义 |
| `localStorage.ts` | 本地存储工具 |
| `mapUtils.ts`     | 地图工具函数 |
| `permission.ts`   | 权限控制     |
| `tool.ts`         | 通用工具函数 |

### B. 组件目录

| 组件          | 功能         |
| :------------ | :----------- |
| `Layout`      | 整体布局     |
| `NavBar`      | 顶部导航栏   |
| `SideBar`     | 侧边栏菜单   |
| `SvgIcon`     | SVG 图标组件 |
| `SearchTable` | 搜索表格组件 |
| `FileUpload`  | 文件上传组件 |
| `DialogInfo`  | 信息弹窗组件 |

---

**文档版本**: v1.0  
**创建日期**: 2026-05-18  
**适用项目**: vue3-admin
