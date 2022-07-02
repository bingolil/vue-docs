import { IOptionItem } from "@/interfaces/components/common/dynamic-form";
import { BasicField } from "./basic-field";

/** 单选框组控件类 */
export class RadioGroup extends BasicField<any>{
  /** 控件类型：单选框组 */
  readonly type = 'radioGroup';

  /** 单选列表组 */
  options: IOptionItem[];

  constructor(options: RadioGroup) {
    super(options);
    this.options = options.options || [];
  }
}