import { IBasicControl } from "./basic-control";
import { IOptionItem } from "./option-item";

/** 多选框组控件接口 */
export interface IRadioGroup extends IBasicControl<any[]> {
  /**列表组 */
  options?: IOptionItem[];
}