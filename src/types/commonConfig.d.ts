declare namespace CommonConfig {
  /**
   * 枚举
   * @param label 标签
   * @param value 值
   */
  interface EnumOptions<T = string, U = number> {
    label: T;
    value: U;
    tagColor?: string;
  }

  /**
   * 接口返回数据
   * @param code 状态码
   * @param data 数据
   * @param extra 额外数据
   * @param msg 消息
   * @param success 是否成功
   */
  interface RequestResult<T> {
    code: number;
    data: T;
    extra: any;
    msg: string;
    success: boolean;
  }

  /**
   * 搜索模块表单参数
   * @param key 表单字段名
   */
  interface SearchForm {
    [key: string]: any;
  }

  /**
   * 搜索模块表单配置
   * @param prop 表单字段名
   * @param label 表单标签
   * @param type 表单类型
   * @param options 表单选项
   * @param width 表单宽度
   */
  interface SearchConfig {
    prop: string;
    label: string;
    type: string;
    options?: Array<{ value: any; label: string }>;
    width?: number;
  }

  /**
   * 表格列配置
   * @param title 列标题
   * @param dataIndex 列数据索引
   * @param align 列对齐方式
   * @param fixed 列固定位置
   * @param options 列选项
   * @param slotName 列插槽名称
   * @param actions 列操作
   * @param children 子列配置
   */
  interface TableColumnConfig {
    title: string;
    dataIndex?: string;
    align?: string;
    fixed?: string;
    width?: number;
    type?: string;
    options?: keyof typeof import("@/utils/enumOptions"); // ts中这样导入该模块的类型信息（不会生成实际的代码导入）
    slotName?: string;
    filterOptions?: string;
    actions?: {
      label: string;
      method: Function;
      type: string;
    }[];
    children?: {
      title: string;
      dataIndex: string;
      slotName?: string;
      align?: string;
    }[];
  }

  /**
   * 历史路由目录标签
   * @param title 显示标题
   * @param path 路径
   */
  interface RouterTagViewConfig {
    title: string | unknown;
    path: string;
  }

  interface MapParams {
    mapVersion?: string;
    mapPlugins?: string[];
    uiVersion?: string;
    uiPlugins?: string[];
  }
}
