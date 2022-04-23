import { store } from "@/store";
import { MutationTypes } from "@/store/mutation-types";
import axios, { AxiosError, Method, ResponseType } from "axios";

/** http请求参数接口 */
interface HttpOptions {
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

/** http请求响应体 */
export interface HttpReponse<T> {
  /** 请求的数据 */
  data: T;
  /** 请求的状态 */
  status: number;
}

/** 封装axios服务 */
export const appService = {
  /**
   * @description axios (get方法)
   * @param options 请求参数
   */
  get(options: HttpOptions): Promise<any> {
    preRequest(options);
    return sendRequest("get", options);
  },
  /**
   * @description axios (post方法)
   * @param options 请求参数
   */
  post(options: HttpOptions): Promise<any> {
    return sendRequest("post", options);
  },
  /**
   * @description axios (delete方法)
   * @param options 请求参数
   */
  delete(options: HttpOptions): Promise<any> {
    return sendRequest("delete", options);
  },
  /**
   * @description axios (put方法) 使用put请求，需要将所有的数据，都发送给接口
   * @param options 请求参数
   */
  put(options: HttpOptions): Promise<any> {
    return sendRequest("put", options);
  },
  /**
   * @description axios (patch方法) 使用patch，打补丁
   * @param options 请求参数
   */
  patch(options: HttpOptions): Promise<any> {
    return sendRequest("patch", options);
  },
};

/**
 * @description 发送axios请求
 * @param method 请求方式
 * @param options http请求参数
 * @returns reponse返回值
 */
const sendRequest = (method: Method, options: HttpOptions) => {
  preRequest(options);
  return new Promise((resolve, reject) => {
    axios.request({
      method: method,
      url: options.url,
      responseType: options.reponseType || "json",
      timeout: 10000, // axios 10秒延迟
      data: options.data,
    }).then(
      (reponse) => {
        store.commit(MutationTypes.SET_LOADING, false);
        resolve(reponse);
      },
      (err) => {
        catchHandleError(err);
        store.commit(MutationTypes.SET_LOADING, false);
        reject(err);
      }
    );
  });
};

/**
 * @description 发送axios请求前
 * @param options axios请求参数
 */
const preRequest = (options: HttpOptions) => {
  if (options.loading === true || options.loading === undefined) {
    store.commit(MutationTypes.SET_LOADING, true);
  }
};

/**
 * @description 捕获并处理错误
 * @param err 错误信息
 */
const catchHandleError = (err: AxiosError) => {
  console.dir(err.message);
};
