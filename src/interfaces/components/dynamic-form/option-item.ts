/** options接口 */
export interface OptionItem {
  /** 展示的文本 */
  text: string;
  /** 绑定的数据 */
  value: any;
  /** 是否不可选 */
  disabled?: boolean;
}