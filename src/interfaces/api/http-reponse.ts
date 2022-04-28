/** http请求响应体 */
export interface IHttpReponse<T> {
  /** 请求的数据 */
  data: T;
  /** 请求的状态 */
  status: number;
}
