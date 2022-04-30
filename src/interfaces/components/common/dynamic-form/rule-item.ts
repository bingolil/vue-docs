import { AppRuleType } from "@/types";

/** 动态表单校验规则项接口 */
export interface IRuleItem {
  /** 校验类型 */
  type: AppRuleType;
  /** 校验不通过提示信息 */
  message: string;
  /** 
   * 参数值:
   * type === minNum 时，value为number类型，代表最小值
   * type === maxNum 时，value为number类型，代表最大值
   * type === minStrLen 时，value为number类型，代表字符串最小长度
   * type === maxStrLen 时，value为number类型，代表字符串最大长度
   * type === minArrLen 时，value为number类型，代表数组最小长度
   * type === maxArrLen 时，value为number类型，代表数组最大长度
   * type === regexp 时，value正则表达式
   * type === equal 时，value为string类型，代表当前表单对象另一控件的属性名称
   */
  value?: number | RegExp | string;
  /** 校验触发方式 change值发生变化时校验，blur失去焦点时校验 */
  // trigger?: 'change' | 'blur';
  /** 是否监听当前控件 type === equal，监听当前控件，在另外的控件展示错误 */
  isListen?: boolean;
}