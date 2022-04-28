import { SelectMode } from "@/types";
import { IBasicControl } from "./basic-control";
import { IOptionItem } from "./option-item";

/** 下拉框控件配置参数接口 */
export interface ISelect extends IBasicControl<any> {
  /**列表组 */
  options?: IOptionItem[];
  /** 支持清除 */
  allowClear?: boolean;
  /** 是否打开下拉框 */
  defaultOpen?: boolean;
  /** 下拉框mode */
  mode?: SelectMode;
}