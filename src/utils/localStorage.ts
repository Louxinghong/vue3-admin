/**
 * 存储数据到localStorage
 * @param key 存储键名
 * @param value 存储值
 */
export const setLocalStorage = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 从localStorage获取数据
 * @param key 存储键名
 * @returns 存储值
 */
export const getLocalStorage = (key: string): any => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

/**
 * 从localStorage移除数据
 * @param key 存储键名
 */
export const removeLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * 清空localStorage
 */
export const clearLocalStorage = (): void => {
  localStorage.clear();
};
