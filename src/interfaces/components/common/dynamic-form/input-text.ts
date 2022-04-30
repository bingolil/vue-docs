import { IBasicControl } from "./basic-control";

export interface IInputText extends IBasicControl<string | null> {
  /** 字符串最大长度 */
  maxLength?: number;
  /** 允许清除 */
  allowClear?: boolean;
  /** 是否带字数提示，maxLength存在时才有意义 */
  showCount?: boolean;
}