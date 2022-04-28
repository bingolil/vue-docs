import { IRuleItem } from "./rule-item";

// 动态表单，基础控件配置参数接口
export interface IBasicControl<T> {
  /** 控件绑定的属性 */
  key: string;
  /** 控件的值 */
  value: T;
  /** 控件label */
  label: string;
  /** 控件不可选 */
  disabled?: boolean;
  /** 控件占位内容 */
  placeholder?: string | string[];
  /** 校验规则 */
  rules?: IRuleItem[]
}