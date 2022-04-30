import { IInputText } from "./input-text";

/** 多行文本输入框控件配置参数接口 */
export interface ITextarea extends IInputText {

  /** textarea 文本输入框行高配置 */
  rowsConfig?: { minRows?: number, maxRows?: number };

}