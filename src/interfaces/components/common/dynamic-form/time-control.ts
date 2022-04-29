import { DisabledTimeFn } from "@/types";
import { Dayjs } from "dayjs";
import { IBasicControl } from "./basic-control";

/** 时间控件配置参数接口 */
export interface ITimeControl extends IBasicControl<Dayjs | null> {

  /** 12小时制 */
  use12Hours?: boolean;
  /** 小时间隔 */
  hourStep?: number;
  /** 分钟间隔 */
  minuteStep?: number;
  /** 秒间隔 */
  secondStep?: number;
  /** 是否展示此刻按钮 */
  showNow?: boolean;
  /** 时间格式 */
  format?: string;
  /** 值的格式 */
  valueFormat?: string;
  /** 是否支持清除 */
  allowClear?: boolean;
  /** 不可选时间 */
  disabledTimeFn?: DisabledTimeFn;
}