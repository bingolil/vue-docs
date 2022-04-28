import { IInputText } from "@/interfaces/components/common/dynamic-form/input-text";
import { BasicField } from "./basic-field";

/** 文本输入框控件类 */
export class InputText extends BasicField<string | null>{

  /** 控件类型：文本输入框 */
  type = 'inputText';
  /** 字符串长度最大值 */
  maxLength: number;

  constructor(options: IInputText) {
    super(options);
    this.maxLength = options.maxLength || Infinity;
  }
}