import { IOptionItem, ISelect } from "@/interfaces/components/common/dynamic-form";
import { SelectMode } from "@/types";
import { BasicField } from "./basic-field";

/** 下拉框控件类 */
export class Select extends BasicField<any>{
  /** 控件类型：下拉框 */
  readonly type = 'select';

  /** 下拉列表数据 */
  options: IOptionItem[];
  /** 支持清除，默认支持清除 */
  allowClear: boolean;
  /** 默认打开下拉框，默认关闭 */
  defaultOpen: boolean;
  /** 选择器类型 */
  mode: SelectMode;

  constructor(options: ISelect) {
    super(options);
    this.options = options.options || [];
    this.allowClear = options.allowClear === undefined ? true : options.allowClear;
    this.defaultOpen = !!options.defaultOpen;
    this.mode = options.mode || 'combobox'
  }
}