// 历史路由目录tag
export interface RouterTagViewConfig {
  title: string | unknown;
  path: string;
}

// excel文件
export interface ExcelFileResult {
  sheetName: string;
  sheetList: Array<{}>;
}

// chat-gpt返参
export interface ChatGptResult {
  choices: Array<{
    message: { content: string };
  }>;
  created: number;
  id: string;
  model: string;
  object: string;
  system_fingerprint: Object;
  usage: Array<{}>;
}

// chat-ai聊天数据
export interface ChatData {
  id: number;
  avatar: string;
  content: string;
  isLoading?: boolean;
}
