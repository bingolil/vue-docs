import { ResponseType } from "axios";

/** http请求参数接口 */
export interface IHttpOptions {
  /** url地址 */
  url: string;
  /** 请求参数 */
  data?: any;
  /** 请求返回的数据类型，默认json */
  reponseType?: ResponseType;
  /** 是否展示loading ui，默认true */
  loading?: boolean;
  /** 是否展示错误信息 */
  showErrorMsg?: boolean;
}