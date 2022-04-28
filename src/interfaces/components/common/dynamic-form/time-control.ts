import { IBasicControl } from "./basic-control";

/** 时间控件配置参数接口 */
export interface ITimeControl extends IBasicControl<number | Date | string | null> {
  /** 12小时制 */
  use12Hours?: boolean;
  /** 时间格式 */
  format?: string;
}