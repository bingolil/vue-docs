import { appService, HttpReponse } from "@/api/request"
import { UserInfo } from "@/interfaces/user/user-info"
import { appUrl } from "@/api/url"

/** 用户相关的api，ex: 获取用户信息，登录，登出 */
export const apiUser = {
  /** 
   * @description 获取用户信息
   * @returns 用户信息的promise
   */
  getUserInfo(): Promise<HttpReponse<UserInfo>> {
    return appService.get({ url: appUrl.userInfo });
  },
  /** 
   * @description 用户登录
   * @param info 登录信息（账号和密码）
   */
  login(info: { account: string, passowrd: string }): Promise<HttpReponse<any>> {
    return appService.post({ url: appUrl.login, data: info });
  },
  /**
   * @description 用户登出
   */
  logout(): Promise<HttpReponse<any>> {
    return appService.post({ url: appUrl.logout })
  }
}