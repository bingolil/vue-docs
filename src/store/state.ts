import { getUILocale } from "@/i18n";
import { StorageUtil } from "@/utils";

/** app state仓库 */
export const state = {
  /** http请求拦截动画 */
  loading: false,
  /** app令牌 */
  token: StorageUtil.getToken(),
  /** app国际化语言 */
  lang: StorageUtil.getLang(),
  /** ui语言库 */
  uiLocale: getUILocale(),
  /** 用户信息 */
  userInfo: StorageUtil.getUserInfo()
}

export type AppStateTypes = typeof state;