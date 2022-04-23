/** 动态表单的控件类型 */
export type ControlType = "inputText" // 单行文本
  | "inputPassword" // 密码输入框
  | "inputNumber" // 数字输入框
  | "textArea" // 多行文本输入框
  | "select" // 下拉选择框
  | "radioGroup" // 单选框组
  | "checkbox" // 单多选框
  | "checkboxGroup" // 多选框组
  | "date" // 日期
  | "dateRange" // 日期范围
  | "time" // 时间
  | "switch" // switch开关


// 动态表单，控件基础接口
export interface BasicControl<T> {
  /** 控件类型 */
  type: ControlType;
  /** 控件绑定的属性 */
  key: string;
  /** 控件的值 */
  value: T;
  /** 控件label */
  label: string;
  /** 控件不可选 */
  diabled?: boolean;
  /** 控件占位内容 */
  placeHolder?: string;
  /** 当前控件校验列表 */
  validatorList?: any;
}