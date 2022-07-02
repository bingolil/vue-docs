import { BasicField } from "./basic-field";

/** 数字输入框控件类 */
export class InputNumber extends BasicField<number | null> {

  /** 控件类型 */
  readonly type = 'inputNumber';

  /** input-number 最小值 */
  min: number;
  /** input-number 最大值 */
  max: number;
  /** input-number 单位最小值 */
  step: number;

  constructor(options: InputNumber) {
    super(options);
    this.min = options.min || 0;
    this.max = options.max || Infinity;
    this.step = options.step || 1;
  }
}