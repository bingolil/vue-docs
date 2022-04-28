import { IBasicControl } from "./basic-control";

export interface IInputNumber extends IBasicControl<number | null> {
  /** 最大数 */
  max?: number;
  /** 最小数 */
  min?: number;
  /** 变化单位最小值 */
  step?: number;
}