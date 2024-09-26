declare namespace CommonConfig {
  interface OptionsConfig<T, U> {
    label: T;
    value: U;
  }

  interface ApiResult {
    code: number;
    data: [] | {};
    msg: string;
    success: boolean;
  }
}
