# 卡片式通讯录模块

## Context

用户需要一个通讯录模块，采用卡片式布局展示联系人，支持按字母分组索引、搜索和详情弹窗。使用 mock 数据，字段包含：姓名、手机号、邮箱、头像。

## 技术栈

遵循项目现有规范：Vue 3 + TS + Arco Design Vue + Less，与 todo 模块一致的模式。

## 文件清单

| 文件 | 说明 |
|---|---|
| `src/utils/interface.ts` | 新增 `Contact` 接口类型 |
| `src/router/routes/contacts.ts` | 新增路由 |
| `src/views/contacts/index.vue` | 主页面（搜索栏 + 字母索引侧边栏 + 卡片列表） |
| `src/views/contacts/components/ContactCard.vue` | 联系人卡片组件 |
| `src/views/contacts/components/ContactDetailModal.vue` | 详情弹窗组件 |
| `src/views/contacts/data/mock.ts` | Mock 数据 |

## 实施步骤

### 1. 类型定义 (`src/utils/interface.ts`)
- 新增 `Contact` 接口：`id, name, phone, email, avatar, group`
- `group` 字段用于字母分组（姓名拼音首字母大写）

### 2. Mock 数据 (`src/views/contacts/data/mock.ts`)
- 生成约 15-20 条联系人数据，覆盖 A-Z 多个字母分组
- avatar 使用 Arco Design 的默认头像占位或 SVG

### 3. ContactCard 组件
- 展示头像（Arco Avatar）、姓名、电话、邮箱
- 点击触发详情弹窗
- 卡片式圆角样式

### 4. ContactDetailModal 组件
- 使用 Arco `a-modal` 展示联系人完整信息
- 大头像 + 所有字段展示

### 5. 主页面 (`src/views/contacts/index.vue`)
- 顶部搜索栏：按姓名/手机号搜索
- 左侧字母索引栏：点击跳转到对应分组
- 主区域：按字母分组渲染 ContactCard 列表
- 响应式布局（小屏隐藏字母索引侧边栏）

### 6. 路由 (`src/router/routes/contacts.ts`)
- path: `/contacts`，name: `Contacts`
- meta: `title: "通讯录"`, `icon: "user"`

## 验证

- `npm run dev` 启动后侧边栏出现"通讯录"菜单项
- 点击后进入卡片式通讯录页面，联系人按字母分组展示
- 搜索框输入可实时过滤
- 点击左侧字母可跳转到对应分组
- 点击卡片弹出详情弹窗
