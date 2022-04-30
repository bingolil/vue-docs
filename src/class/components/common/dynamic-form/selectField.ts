import { IOptionItem, ISelectControl } from "@/interfaces/components/common/dynamic-form";
import { SelectMode } from "@/types";
import { BasicField } from "./basic-field";

/** 下拉框控件类 */
export class SelectField extends BasicField<any>{
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
  /** 最多显示多少个tag */
  maxTagCount: number | undefined;
  /** 是否可输入 */
  showSearch: boolean;

  constructor(options: ISelectControl) {
    super(options);
    this.options = options.options || [];
    this.allowClear = options.allowClear === undefined ? true : options.allowClear;
    this.defaultOpen = !!options.defaultOpen;
    this.mode = options.mode || 'combobox';
    if (this.mode !== 'combobox') { // 多选时，存在显示多少个tag
      this.maxTagCount = options.maxTagCount;
    }
    this.showSearch = !!options.showSearch;
  }
}