declare namespace CommonConfig {
  interface OptionsConfig<T = string, U = number> {
    label: T;
    value: U;
  }

  interface ApiResult {
    code: number;
    data: [] | {};
    msg: string;
    success: boolean;
  }

  interface MapParams {
    mapVersion?: string;
    mapPlugins?: string[];
    uiVersion?: string;
    uiPlugins?: string[];
  }
}
