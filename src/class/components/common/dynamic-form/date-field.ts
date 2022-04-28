import { IDateControl } from "@/interfaces/components/common/dynamic-form";
import { DatePickerType } from "@/types";
import { BasicField } from "./basic-field";

/** 日期控件类 Date已被使用，采用DateField */
export class DateField extends BasicField<number | string | Date | null>{
  /** 控件类型：日期 */
  readonly type = 'date';

  /** 展示格式 */
  format: string;
  /** 值的格式 */
  valueFormat: string;
  /** 时间选择器类型 */
  picker: DatePickerType;
  /** 是否展示时间 */
  showTime: boolean;
  /** 是否支持清除 */
  allowClear: boolean;

  constructor(options: IDateControl) {
    super(options);
    this.format = options.format || 'YYYY-MM-DD';
    this.valueFormat = options.valueFormat || 'YYYY-MM-DD';
    this.picker = options.picker || 'date';
    this.showTime = !!options.showTime;
    this.allowClear = options.allowClear === undefined ? true : options.allowClear;
  }

}