import { IDateRange } from "@/interfaces/components/common/dynamic-form";
import { DatePickerType } from "@/types";
import { Dayjs } from "dayjs";
import { BasicField } from "./basic-field";

/** 时间范围控件类 */
export class DateRange extends BasicField<Dayjs[] | null>{

  /** 控件类型：时间范围 */
  readonly type = 'dateRange';

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

  constructor(options: IDateRange) {
    super(options);
    this.format = options.format || 'YYYY-MM-DD';
    this.valueFormat = options.valueFormat || 'YYYY-MM-DD';
    this.picker = options.picker || 'date';
    this.showTime = !!options.showTime;
    this.allowClear = options.allowClear === undefined ? true : options.allowClear;
  }
}