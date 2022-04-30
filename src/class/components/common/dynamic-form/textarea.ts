import { ITextarea } from "@/interfaces/components/common/dynamic-form";
import { InputText } from "./input-text";

/** 多行文本输入框控件类 */
export class Textarea extends InputText {

  /** 控件类型：多行文本输入框 */
  readonly type = 'textarea';

  /** textarea 文本输入框行高配置 */
  rowsConfig: { minRows: number, maxRows: number };

  constructor(options: ITextarea) {
    super(options);
    this.rowsConfig = {
      minRows: options.rowsConfig?.minRows || 2,
      maxRows: options.rowsConfig?.maxRows || Infinity
    };
  }
}