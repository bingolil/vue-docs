import { DatePickerType } from "@/types";
import { Dayjs } from "dayjs";
import { IBasicControl } from "./basic-control";

/** 时间范围控件参数接口 */
export interface IDateRange extends IBasicControl<Dayjs[] | null> {

  /** 日期格式 */
  format?: string;
  /** 值的格式 */
  valueFormat?: string;
  /** 时间选择器类型 */
  picker?: DatePickerType;
  /** 是否展示时间 */
  showTime?: boolean;
  /** 是否支持清除 */
  allowClear?: boolean;

}