import { IBasicControl } from "@/interfaces/components/common/dynamic-form";
import { BasicField } from "./basic-field";

/** 单个多选框控件类 */
export class Checkbox extends BasicField<boolean>{

  /** 控件类型 单个多选框 */
  readonly type = 'checkbox';

  constructor(options: IBasicControl<boolean>) {
    super(options);
  }
}