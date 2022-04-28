import { ITimeControl } from "@/interfaces/components/common/dynamic-form";
import { BasicField } from "./basic-field";

/** 时间控件类 */
export class TimeField extends BasicField<number | string | Date | null>{

  /** 控件类型 */
  readonly type = 'time';

  constructor(options: ITimeControl) {
    super(options);
  }
}