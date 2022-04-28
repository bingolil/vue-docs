import { IBasicControl } from "@/interfaces/components/common/dynamic-form";
import { BasicField } from "./basic-field";

/** 密码输入框控件类 */
export class InputPassword extends BasicField<string | null>{

  /** 控件类型 */
  readonly type = 'inputPassword';

  constructor(options: IBasicControl<string | null>) {
    super(options);
  }
}