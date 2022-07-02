import { DisabledTimeFn } from "@/types";
import { Dayjs } from "dayjs";
import { BasicField } from "./basic-field";

/** 时间控件类 */
export class TimeField extends BasicField<Dayjs | Dayjs[] | null>{

  /** 控件类型 */
  type = 'time';

  /** 展示格式 */
  format: string;
  /** 值格式 */
  valueFormat: string;
  /** 12小时制，格式为：hh:mm:ss */
  use12Hours: boolean;
  /** 小时间隔 */
  hourStep: number;
  /** 分钟间隔 */
  minuteStep: number;
  /** 秒间隔 */
  secondStep: number;
  /** 是否展示此刻按钮 */
  showNow: boolean;
  /** 是否支持清除 */
  allowClear: boolean;
  /** 不可选时间 */
  disabledTimeFn: DisabledTimeFn | undefined;

  constructor(options: TimeField) {
    super(options);
    this.format = options.format || 'HH:mm:ss'
    this.valueFormat = options.valueFormat || 'HH:mm:ss';
    this.use12Hours = !!options.use12Hours;
    this.hourStep = options.hourStep || 1;
    this.minuteStep = options.minuteStep || 1;
    this.secondStep = options.secondStep || 1;
    this.showNow = options.showNow === undefined ? true : !!options.showNow;
    this.disabledTimeFn = options.disabledTimeFn;
    this.allowClear = options.allowClear === undefined ? true : options.allowClear;
  }
}