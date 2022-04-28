import { IBasicControl } from "./basic-control";

/** 多行文本输入框控件配置参数接口 */
export interface ITextarea extends IBasicControl<string | null> {

  /** textarea 文本输入框行高配置 */
  rowsConfig?: { minRows?: number, maxRows?: number };
  
}