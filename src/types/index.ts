import { LANG } from "@/constant";
import { Form } from "ant-design-vue";

/** 定义valueof */
type valueof<T> = T[keyof T];

/** 语言对象的值组成的类型（对象为不可变 object as const，不然返回为值类型） */
export type langValueType = valueof<typeof LANG>;

/** 语言对象的属性key组成的类型 */
export type langKeyType = keyof typeof LANG;

/** antd的组件的useForm的类型 */
export type AntdUseFormType = ReturnType<typeof Form.useForm>;

/** 日期选择器类型 年，月，周，日 */
export type DatePickerType = 'year' | 'month' | 'week' | 'date';

/** 下拉框类型，combobox单选，tags multiple多选 */
export type SelectMode = 'multiple' | 'tags' | 'combobox';

export type AppRuleType = 'required' // 必填
  | 'minNum' // 数字最小值
  | 'maxNum' // 数字最大值
  | 'minStrLen' // 字符串最小长度
  | 'maxStrLen' // 字符串最小长度
  | 'regexp' // 正在表达式
  | 'equal' // 两个值是否相等 ex：密码和确认密码
  | 'minArrLen' // 数组最小长度
  | 'maxArrLen'; // 数组最大长度