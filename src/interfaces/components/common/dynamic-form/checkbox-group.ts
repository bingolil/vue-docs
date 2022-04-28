import { IBasicControl } from "./basic-control";
import { IOptionItem } from "./option-item";

/** 多选框组控件参数接口 */
export interface ICheckboxGroup extends IBasicControl<any[]> {
  /**列表组 */
  options?: IOptionItem[];
}