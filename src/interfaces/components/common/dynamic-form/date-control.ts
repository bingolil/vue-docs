import { DatePickerType } from "@/types";
import { IBasicControl } from "./basic-control";

/** 时间控件参数接口 */
export interface IDateControl extends IBasicControl<Date | number | string | null> {
  /** 日期或时间格式  */
  format?: string;
  /** 绑定的值的格式 */
  valueFormat?: string;
  /** 日期选择器类型，建议搭配format和valueFormat展示 */
  picker?: DatePickerType;
  /** 是否展示时间，需要搭配format和valueFormat */
  showTime?: boolean;
  /** 是否支持清除 */
  allowClear?: boolean;
}