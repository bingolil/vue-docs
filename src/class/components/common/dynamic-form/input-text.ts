import { IInputText } from "@/interfaces/components/common/dynamic-form/input-text";
import { BasicField } from "./basic-field";

/** 文本输入框控件类 */
export class InputText extends BasicField<string | null>{

  /** 控件类型：文本输入框 */
  type = 'inputText';
  /** 字符串长度最大值 */
  maxLength: number | undefined;
  /** 允许清除 */
  allowClear: boolean;
  /** 是否代字数提示 */
  showCount: boolean;

  constructor(options: IInputText) {
    super(options);
    this.maxLength = options.maxLength;
    this.allowClear = !!options.allowClear;
    this.showCount = options.maxLength !== undefined && !!options.showCount;
  }
}