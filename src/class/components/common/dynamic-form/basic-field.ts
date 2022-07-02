import { IRuleItem } from "@/interfaces/components/common/dynamic-form";

/** 基础控件虚类 */
export abstract class BasicField<T> {
  /** 当前控件项的值 */
  value: T | null;
  /** 响应式表单绑定的属性 */
  key: string;
  /** 表单控件项描述 */
  label: string;
  /** 表单控件是否可用 */
  disabled: boolean;
  /** 表单控件占位内容 */
  placeholder: string | string[];
  /** 控件校验列表 */
  rules?: IRuleItem[];
  constructor(options: BasicField<T>) {
    this.key = options.key || '';
    this.label = options.label || '';
    this.value = options.value === undefined ? null : options.value;
    this.disabled = !!options.disabled;
    this.placeholder = options.placeholder || '';
    this.rules = options.rules || [];
  }
}