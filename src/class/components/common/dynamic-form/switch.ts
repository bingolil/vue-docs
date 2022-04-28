import { IBasicControl } from "@/interfaces/components/common/dynamic-form";
import { BasicField } from "./basic-field";

/** 开关控件类 */
export class Switch extends BasicField<boolean>{

  /** 控件类型，开关 */
  readonly type = 'switch';

  constructor(options: IBasicControl<boolean>) {
    super(options);
  }
}