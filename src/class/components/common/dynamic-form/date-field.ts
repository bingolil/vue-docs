import { IDateControl } from "@/interfaces/components/common/dynamic-form";
import { DatePickerType, DisabledDateFn } from "@/types";
import { TimeField } from "./time-field";

/** 日期控件类 Date已被使用，采用DateField */
export class DateField extends TimeField {
  /** 控件类型：日期 */
  type = 'date';

  /** 时间选择器类型 */
  picker: DatePickerType;
  /** 是否展示时间 */
  showTime: boolean;
  /** 不可选日期 */
  disabledDateFn: DisabledDateFn | undefined;

  constructor(options: IDateControl) {
    super(options);
    this.format = options.format || 'YYYY-MM-DD'; // 重置日期格式
    this.valueFormat = options.valueFormat || 'YYYY-MM-DD'; // 重置日期格式
    this.picker = options.picker || 'date';
    this.showTime = !!options.showTime;
    this.disabledDateFn = options.disabledDateFn;
  }

}