/** 不可选时间接口配置 */
export interface IDisabledTimeConfig {
  /** 不可选小时 */
  disabledHours(): number[];
  /** 不可选分钟 */
  disabledMinutes(hour: number): number[];
  /** 不可选秒 */
  disabledSeconds(hour: number, minute: number): number[];
}
