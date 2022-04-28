import dayjs from "dayjs";

/** 时间类型 */
type DateType = number | string | Date;

/**
 * @description 时间格式化
 * @param value 时间数据
 * @param pattern 格式，默认为 YYYY-MM-DD HH:mm:ss 格式
 * @returns 根据格式转换后的字符串
 */
export const dateFormat = (value: DateType, pattern = 'YYYY-MM-DD HH:mm:ss'): string => {
  return dayjs(value).format(pattern);
}

/**
 * @description 字符串过长，超出部分采用...替换
 * @param vlaue 字符串数据
 * @param length 展示的长度
 * @returns 处理后的字符串
 */
export const ellipsis = (vlaue: string, length = 25): string => {
  if (!vlaue) return "";
  if (vlaue.length > length) {
    return vlaue.slice(0, length) + '...';
  }
  return vlaue;
}