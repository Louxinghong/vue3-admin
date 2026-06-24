# 日历签到模块设计文档

**日期:** 2026-06-24  
**状态:** 已批准  

## 概述

在 `src/views/signin/` 下实现一个游戏化风格的日历签到模块，支持每日签到、连续签到奖励、补签功能和积分展示。

## 架构与文件结构

```
src/
├── api/
│   └── signin.ts                    # 签到 API（mock，后续替换真实接口）
├── store/modules/
│   └── signin.ts                    # Pinia store：签到状态管理
├── views/signin/
│   ├── index.vue                    # 主页面：游戏化卡片布局
│   └── components/
│       ├── MonthCalendar.vue        # 月历网格渲染 + 签到标记渲染
│       ├── StreakBadge.vue          # 连续签到天数徽章
│       ├── SigninButton.vue         # 签到按钮（带动画 + 防抖）
│       ├── MakeupModal.vue          # 补签弹窗（选择日期 + 补签卡消耗）
│       └── PointsPanel.vue          # 积分面板（今日签到积分 + 累计积分）
└── router/routes/
    └── signin.ts                    # 签到路由
```

## 组件职责

### index.vue（主页面）
- 布局容器，组合所有子组件为游戏化卡片风格
- 月份切换逻辑（上一月/下一月按钮）
- 页面加载时调用 store 获取当月签到记录

### MonthCalendar.vue
- 接收当月日期列表和签到记录，渲染日历网格
- 已签到日期显示彩色标记点
- 今日日期高亮显示
- 可点击未签到日期触发签到

### StreakBadge.vue
- 从 store 读取连续签到天数
- 展示徽章（普通/7 天里程碑/30 天里程碑不同样式）
- 进度条显示距离下一里程碑

### SigninButton.vue
- 签到按钮，点击触发 store 的 `doSignin` action
- 按钮防抖（防止重复点击）
- 签到成功动画效果

### MakeupModal.vue
- Arco Modal 弹窗
- 展示过去 7 天内可补签的日期
- 显示补签卡数量，点击补签消耗 1 张卡
- 无补签卡时禁用补签按钮

### PointsPanel.vue
- 显示签到积分规则（普通签到、连续 7 天、连续 30 天）
- 显示本用户当前累计积分
- 签到成功后显示积分增加动画

## 数据流

```
组件 → 调用 Store Action → API (mock) → 更新 State → 组件响应式更新
```

月份切换时调用 `fetchRecords` 刷新当月数据。

## 状态管理（Pinia Store）

```typescript
interface SigninState {
  records: Map<string, boolean>    // 日期字符串 -> 是否已签到
  streakDays: number               // 连续签到天数
  makeupCards: number              // 补签卡数量
  points: number                   // 累计积分
  lastSigninDate: string | null    // 上次签到日期
  loading: boolean                 // API 请求中
}
```

**核心 Actions：**
1. `fetchRecords(year, month)` — 获取当月签到记录
2. `doSignin()` — 执行每日签到
3. `doMakeup(date)` — 补签指定日期

## API 接口设计（`src/api/signin.ts`）

所有接口返回 mock 数据，后续替换真实后端：

```typescript
interface SigninRecord {
  date: string        // YYYY-MM-DD
  signed: boolean
}

interface SigninResult {
  success: boolean
  points: number      // 本次获得的积分
  streakDays: number  // 更新后的连续天数
}

// GET /api/signin/records?year=2026&month=6
getSigninRecords(year: number, month: number): Promise<SigninRecord[]>

// POST /api/signin/do
doSignin(): Promise<SigninResult>

// POST /api/signin/makeup
doMakeup(date: string): Promise<SigninResult>

// GET /api/signin/info
getSigninInfo(): Promise<{ makeupCards: number; points: number }>
```

## 业务规则

**签到规则：**
- 每天只能签到一次
- 点击签到按钮或点击日历中今日未签到日期触发

**连续天数规则：**
- 从今天往前推，连续有签到记录的天数
- 中断则重置为 1（今天新签到后）

**补签规则：**
- 只能补签过去 7 天内漏签的日期
- 每次消耗 1 张补签卡
- 初始 3 张补签卡
- 补签无额外里程碑奖励

**积分规则：**
- 普通签到：+1 积分
- 连续 7 天里程碑：额外 +7 积分
- 连续 30 天里程碑：额外 +30 积分
- 补签：+1 积分（无额外奖励）

## 视觉风格

游戏化卡片风格：
- 圆角卡片容器
- 彩色签到标记点（不同颜色区分普通/里程碑签到）
- 进度条显示连续签到进度
- 签到成功动画
- 徽章样式区分 7 天/30 天里程碑

## 路由

挂载到侧边栏菜单，与 `dashboard`、`test` 同级。
路径：`/signin`，路由名：`Signin`，标题：「签到日历」
