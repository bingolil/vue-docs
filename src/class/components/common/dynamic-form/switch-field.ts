import { BasicField } from "./basic-field";

/** 开关控件类 */
export class SwitchField extends BasicField<boolean>{

  /** 控件类型，开关 */
  readonly type = 'switch';

  constructor(options:SwitchField) {
    super(options);
  }
}