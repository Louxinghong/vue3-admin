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
