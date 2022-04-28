import { IBasicControl } from "./basic-control";

export interface IInputText extends IBasicControl<string | null> {
  /** 字符串最大长度 */
  maxLength?: number;
}