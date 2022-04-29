import { DatePickerType, DisabledDateFn } from "@/types";
import { ITimeControl } from "./time-control";

/** 时间控件参数接口 */
export interface IDateControl extends ITimeControl {

  /** 日期选择器类型，建议搭配format和valueFormat展示 */
  picker?: DatePickerType;
  /** 是否展示时间，需要搭配format和valueFormat */
  showTime?: boolean;
  /** 是否支持清除 */
  allowClear?: boolean;
  /** 不可选日期，true代表不可选，false代表可选 */
  disabledDateFn?: DisabledDateFn;

}