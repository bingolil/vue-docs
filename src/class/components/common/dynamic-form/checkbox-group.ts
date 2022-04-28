import { IOptionItem } from "@/interfaces/components/common/dynamic-form";
import { ICheckboxGroup } from "@/interfaces/components/common/dynamic-form/checkbox-group";
import { BasicField } from "./basic-field";

/** 多选框组控件类 */
export class CheckboxGroup extends BasicField<any[]>{

  /** 控件类型： 多选框组 */
  readonly type = 'checkboxGroup';
  /** 多选列表组 */
  options: IOptionItem[];

  constructor(options: ICheckboxGroup) {
    super(options);
    this.options = options.options || [];
  }
}