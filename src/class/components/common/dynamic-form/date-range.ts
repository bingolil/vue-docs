import { IDateControl } from "@/interfaces/components/common/dynamic-form";
import { DateField } from ".";

/** 时间范围控件类 */
export class DateRange extends DateField {

  /** 控件类型：时间范围 */
  readonly type = 'dateRange';

  constructor(options: IDateControl) {
    super(options);
  }
}