import { BasicControl } from "./basic-control";

export interface InputNumber extends BasicControl<number> {
  /** 最大数 */
  max?: number;
  /** 最小数 */
  min?: number;
  /** 变化单位最小值 */
  step?: number;
}